const express = require("express");
const router = express.Router();

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getProfile,
    updateProfile,
    changePassword,
    registerUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ==========================
// Public Route
// ==========================
router.post("/register", registerUser);

// ==========================
// Protected Admin Routes
// ==========================

// Get All Users
router.get(
    "/",
    protect,
    roleMiddleware("Admin"),
    getUsers
);

// Create User
router.post(
    "/",
    protect,
    roleMiddleware("Admin"),
    createUser
);

// Update User
router.put(
    "/:id",
    protect,
    roleMiddleware("Admin"),
    updateUser
);

// Delete User
router.delete(
    "/:id",
    protect,
    roleMiddleware("Admin"),
    deleteUser
);

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;