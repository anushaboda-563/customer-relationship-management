const express = require("express");
const router = express.Router();

const {
    uploadDocument,
    getDocuments,
    deleteDocument
} = require("../controllers/documentController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Upload Document
router.post("/", protect, upload.single("document"), uploadDocument);

// Get All Documents
router.get("/", protect, getDocuments);

// Delete Document
router.delete("/:id", protect, deleteDocument);

module.exports = router;