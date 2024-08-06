const mongoose = require("mongoose");

require("dotenv").config();

const dbPort = process.env.DB_PORT;
const connectDb = ()=>{
    try {
        mongoose.connect(dbPort);
        console.log(`Database connected`);
    }catch (e) {
        console.log(e);
    }
};


module.exports = connectDb;