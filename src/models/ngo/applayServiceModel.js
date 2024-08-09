const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const applayServiceSchema = new Schema({
    userName: {
        type: String,
    },
    userPhone: {
        type: String,
    },
    serviceName: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "complete"],
        default: "pending",
    },

},{
    timestamps:true,
    versionKey:false
});


const applayModel = model("applayServices", applayServiceSchema );

module.exports = applayModel;