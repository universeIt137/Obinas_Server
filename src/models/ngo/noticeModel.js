const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const noticeSchema = new Schema({
    title: {
        type: String,
    },
    noticeImage: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },

},{
    timestamps:true,
    versionKey:false
});

const noticeModel = model("notices",noticeSchema);

module.exports = noticeModel;