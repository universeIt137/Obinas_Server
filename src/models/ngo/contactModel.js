const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const contactUsSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is require"],
    },
    mobile: {
        type: Number,
        required: [true, "number is required"],
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
        comment: {
        type: String,
        required: [true, "comment is required"],
    },

},{
    timestamps:true,
    versionKey:false
});

const contactUsModel = model("contact", contactUsSchema );

module.exports = contactUsModel;