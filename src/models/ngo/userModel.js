let mongoose = require("mongoose");
let {Schema,model} = mongoose;

let userSchema = new Schema({
    name: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required"],
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
    role: {
        type: String,
        enum: ["user", "admin", "super_admin"],
        default: "user",
    },
},{
    timestamps:true,versionKey:false
});

const userModel = model("users",userSchema);

module.exports = userModel;
