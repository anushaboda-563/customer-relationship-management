const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        value: {
            type: Number,
            required: true
        },

        stage: {
            type: String,
            enum: [
                "New",
                "Negotiation",
                "Won",
                "Lost"
            ],
            default: "New"
        },

        lead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lead",
            required: true
        },

        expectedCloseDate: {
            type: Date,
            required: true
        }

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Deal", dealSchema);