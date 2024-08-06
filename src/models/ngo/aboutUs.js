const mongoose = require("mongoose");

const {Schema,model} = mongoose;


const aboutUsSchema = new Schema({
    name: {
        type: String,
    },
    aboutImage: {
        type: String,
    },
    description: {
        type: String,
    },
},{
    timestamps:true,
    versionKey:false
});

const aboutUsModel = model("about", aboutUsSchema );

module.exports = aboutUsModel;