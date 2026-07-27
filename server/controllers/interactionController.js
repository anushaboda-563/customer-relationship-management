const Interaction = require("../models/Interaction");

// Create Interaction
const createInteraction = async (req, res) => {
    try {

        const interaction = await Interaction.create(req.body);

        res.status(201).json({
            message: "Interaction Created Successfully",
            interaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Interactions
const getInteractions = async (req, res) => {
    try {

        const interactions = await Interaction.find().populate("lead");

        res.status(200).json(interactions);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Update Interaction
const updateInteraction = async (req, res) => {
    try {

        const interaction = await Interaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!interaction) {
            return res.status(404).json({
                message: "Interaction not found"
            });
        }

        res.status(200).json({
            message: "Interaction Updated Successfully",
            interaction
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
// Delete Interaction
const deleteInteraction = async (req, res) => {
    try {

        const interaction = await Interaction.findByIdAndDelete(req.params.id);

        if (!interaction) {
            return res.status(404).json({
                message: "Interaction not found"
            });
        }

        res.status(200).json({
            message: "Interaction Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    createInteraction,
    getInteractions,
    updateInteraction,
    deleteInteraction
};