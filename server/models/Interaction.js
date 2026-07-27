const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
    {
        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true
        },

        type: {
            type: String,
            enum: ["Call", "Meeting", "Email"],
            required: true
        },

        notes: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Interaction", interactionSchema);