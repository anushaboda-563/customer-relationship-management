const Document = require("../models/Document");

// Upload Document
const uploadDocument = async (req, res) => {
    try {

        const document = await Document.create({
            fileName: req.file.filename,
            filePath: req.file.path,
            lead: req.body.lead
        });

        res.status(201).json({
            message: "Document Uploaded Successfully",
            document
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Documents
const getDocuments = async (req, res) => {
    try {

        const documents = await Document.find().populate("lead");

        res.status(200).json(documents);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Delete Document
const deleteDocument = async (req, res) => {
    try {

        const document = await Document.findByIdAndDelete(req.params.id);

        if (!document) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        res.status(200).json({
            message: "Document Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    uploadDocument,
    getDocuments,
    deleteDocument
};