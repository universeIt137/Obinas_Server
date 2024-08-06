const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const mediaSchema = new Schema({
    mediaImage : {
        type : String
    },
},{
    timestamps:true,
    versionKey:false
});

const mediaModel = model("media",mediaSchema);

module.exports = mediaModel;