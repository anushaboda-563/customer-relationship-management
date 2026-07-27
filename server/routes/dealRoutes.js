const express = require("express");
const router = express.Router();

const {
    createDeal,
    getDeals,
    updateDeal,
    deleteDeal
} = require("../controllers/dealController");

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Deal
router.post(
    "/",
    protect,
    roleMiddleware("Admin", "Sales Manager"),
    createDeal
);

// Get All Deals
router.get(
    "/",
    protect,
    roleMiddleware("Admin", "Sales Manager", "Sales Representative"),
    getDeals
);

// Update Deal
router.put(
    "/:id",
    protect,
    roleMiddleware("Admin", "Sales Manager"),
    updateDeal
);

// Delete Deal
router.delete(
    "/:id",
    protect,
    roleMiddleware("Admin"),
    deleteDeal
);

module.exports = router;