const mongoose = require("mongoose");
const {model,Schema} = mongoose;

const serviceSchema = new Schema({
    serviceName: {
        type: String,
        // required: [true, "service name is required"],
    },
    serviceImage: {
        type: String,
    },
    title: {
        type: String,
        // required: [true, "title is required"],
    },
    description: {
        type: String,
    },
    keyFeatures: [],
    specialNote: [],
},{
    timestamps:true,
    versionKey:false
});



const serviceModel = model("services", serviceSchema );

module.exports = serviceModel;