const Lead = require("../models/Lead");

const createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);

        res.status(201).json({
            message: "Lead Created Successfully",
            lead
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getLeads = async (req, res) => {
    try {

        const leads = await Lead.find();

        res.status(200).json(leads);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const updateLead = async (req, res) => {
    try {

        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        res.status(200).json({
            message: "Lead Updated Successfully",
            lead
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const deleteLead = async (req, res) => {
    try {

        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({
                message: "Lead not found"
            });
        }

        res.status(200).json({
            message: "Lead Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createLead,
    getLeads,
    updateLead,
    deleteLead
};