const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const ourConcernSchema = new Schema({
    name: String,
    description: String,

    location: {
        type: String,
    },
    contact: {
        phone: String,
        email: String,
        facebook: String,
    },

},{
    timestamps:true,
    versionKey:false
});

const ourConcernModel = model("concern", ourConcernSchema );

module.exports = ourConcernModel;