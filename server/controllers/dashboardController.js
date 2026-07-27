const User = require("../models/User");
const Lead = require("../models/Lead");
const Deal = require("../models/Deal");
const Interaction = require("../models/Interaction");
const Document = require("../models/Document");

// Get Dashboard Statistics
const getDashboard = async (req, res) => {
    try {

        // Total Counts
        const usersCount = await User.countDocuments();
        const leadsCount = await Lead.countDocuments();
        const dealsCount = await Deal.countDocuments();
        const interactionsCount = await Interaction.countDocuments();
        const documentsCount = await Document.countDocuments();

        // Lead Status
        const leadStatus = {
            New: await Lead.countDocuments({ status: "New" }),
            Contacted: await Lead.countDocuments({ status: "Contacted" }),
            Qualified: await Lead.countDocuments({ status: "Qualified" }),
            Lost: await Lead.countDocuments({ status: "Lost" }),
        };

        // Deal Stage
        const dealStage = {
            New: await Deal.countDocuments({ stage: "New" }),
            Negotiation: await Deal.countDocuments({ stage: "Negotiation" }),
            Proposal: await Deal.countDocuments({ stage: "Proposal" }),
            Won: await Deal.countDocuments({ stage: "Won" }),
            Lost: await Deal.countDocuments({ stage: "Lost" }),
        };

        // Interaction Type
        const interactionType = {
            Call: await Interaction.countDocuments({ type: "Call" }),
            Email: await Interaction.countDocuments({ type: "Email" }),
            Meeting: await Interaction.countDocuments({ type: "Meeting" }),
        };

        // Recent Leads
        const recentLeads = await Lead.find()
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Deals
        const recentDeals = await Deal.find()
            .populate("lead", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Interactions
        const recentInteractions = await Interaction.find()
            .populate("lead", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        // Recent Documents
        const recentDocuments = await Document.find()
            .populate("lead", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        // Upcoming Meetings
        const upcomingMeetings = await Interaction.find({
            type: "Meeting",
            date: { $gte: new Date() }
        })
        .populate("lead", "name")
        .sort({ date: 1 })
        .limit(5);
        console.log("Upcoming Meetings:", upcomingMeetings);

        // ==========================
        // Monthly Analytics
        // ==========================

        const monthlyLeads = await Lead.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const monthlyDeals = await Deal.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Response
        res.status(200).json({

            users: usersCount,
            leads: leadsCount,
            deals: dealsCount,
            interactions: interactionsCount,
            documents: documentsCount,

            leadStatus,
            dealStage,
            interactionType,

            recentLeads,
            recentDeals,
            recentInteractions,
            recentDocuments,

            upcomingMeetings,

            monthlyLeads,
            monthlyDeals,
            

        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    getDashboard,
};