const mongoose = require("mongoose");
const {Schema,model} = mongoose;


const newsSchema = new Schema({
    title: {
        type: String,
        require: [true, "title is required"],
    },
    newsImage: {
        type: String,
    },
    keyword: {
        type: String,
        require: [true, "keyword is required"],
    },
    description: {
        type: String,
    },
},{
    timestamps:true,
    versionKey:false
});

const newsModel = model("newsData", newsSchema );

module.exports = newsModel;