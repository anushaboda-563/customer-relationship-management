const Deal = require("../models/Deal");

// Create Deal
const createDeal = async (req, res) => {
    try {

        const deal = await Deal.create(req.body);

        res.status(201).json({
            message: "Deal Created Successfully",
            deal
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Deals
const getDeals = async (req, res) => {
    try {

        const deals = await Deal.find().populate("lead");

        res.status(200).json(deals);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Update Deal
const updateDeal = async (req, res) => {
    try {

        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!deal) {
            return res.status(404).json({
                message: "Deal not found"
            });
        }

        res.status(200).json({
            message: "Deal Updated Successfully",
            deal
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Delete Deal
const deleteDeal = async (req, res) => {
    try {

        const deal = await Deal.findByIdAndDelete(req.params.id);

        if (!deal) {
            return res.status(404).json({
                message: "Deal not found"
            });
        }

        res.status(200).json({
            message: "Deal Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createDeal,
    getDeals,
    updateDeal,
    deleteDeal
};