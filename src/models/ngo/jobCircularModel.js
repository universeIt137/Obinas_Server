const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const jobCircularSchema = new Schema({
    jobTitle: {
        type: String,
        required: [true, "job title is required"],
    },
    jobDescription: {
        type: String,
        required: [true, "jobDescription is required"],
    },
    salary: {
        type: String,
    },
    experience: {
        type: String,
    },
    deadline: {
        type: String,
    },
},{
    timestamps : true,
    versionKey : false
});

const jobCircularModel = model("jobCircular", jobCircularSchema);

module.exports = jobCircularModel;