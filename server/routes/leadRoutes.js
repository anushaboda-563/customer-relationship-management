const express = require("express");
const router = express.Router();

const {
    createLead,
    getLeads,
    updateLead,
    deleteLead
} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Lead
router.post(
    "/",
    protect,
    roleMiddleware(
        "Admin",
        "Sales Manager",
        "Sales Representative"
    ),
    createLead
);

// Get All Leads
router.get(
    "/",
    protect,
    roleMiddleware(
        "Admin",
        "Sales Manager",
        "Sales Representative"
    ),
    getLeads
);

// Update Lead
router.put(
    "/:id",
    protect,
    roleMiddleware(
        "Admin",
        "Sales Manager",
        "Sales Representative"
    ),
    updateLead
);

// Delete Lead (Admin Only)
router.delete(
    "/:id",
    protect,
    roleMiddleware("Admin"),
    deleteLead
);

module.exports = router;