const express = require("express");
const router = express.Router();

const {
    createInteraction,
    getInteractions,
    updateInteraction,
    deleteInteraction
} = require("../controllers/interactionController");

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create Interaction
router.post(
    "/",
    protect,
    roleMiddleware(
        "Admin",
        "Sales Manager",
        "Sales Representative"
    ),
    createInteraction
);

// Get All Interactions
router.get(
    "/",
    protect,
    roleMiddleware(
        "Admin",
        "Sales Manager",
        "Sales Representative"
    ),
    getInteractions
);

// Update Interaction
router.put(
    "/:id",
    protect,
    roleMiddleware(
        "Admin",
        "Sales Manager",
        "Sales Representative"
    ),
    updateInteraction
);

// Delete Interaction (Admin Only)
router.delete(
    "/:id",
    protect,
    roleMiddleware("Admin"),
    deleteInteraction
);

module.exports = router;