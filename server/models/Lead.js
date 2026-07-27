const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phone:{
        type:String,
        required:true
    },

    company:{
        type:String
    },

    status:{
        type:String,
        enum:["New","Contacted","Qualified","Lost","Won"],
        default:"New"
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Lead",leadSchema);