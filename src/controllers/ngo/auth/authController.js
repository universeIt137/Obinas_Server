const userModel = require("../../../models/ngo/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const {parseUserToken} = require("../../../helper/helper");

class authClass {
    signUp = async (req,res)=>{
        try {
            let {phone,email,password} = req.body;
            let userEmail = await userModel.findOne({email:email});
            if (userEmail){
                return res.status(409).json({
                    status:"success",
                    msg : "User email is already exists."
                });
            }else if (!email){
                return res.status(428).json({
                    status:"success",
                    msg : "User email required"
                });
            }
            else if (!phone){
                return res.status(428).json({
                    status : "fail",
                    msg : "User phone number required."
                })
            }else if (!password){
                return res.status(428).json({
                    status:"fail",
                    msg : "User password required."
                })
            }else {

                bcrypt.hash(req.body.password,saltRounds,async (err,hash)=>{
                    const newUser = new userModel({
                        name : req.body.name,
                        email : req.body.email,
                        password : hash,
                        phone : req.body.phone
                    });

                    await newUser.save();
                    return res.status(201).json({
                        status : "success",
                        data : newUser
                    });

                } )

            }
        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg : "Internal server error"
            });
        }
    };
    signIn = async (req,res)=>{
        try {
            require("dotenv").config();
            const key = process.env.AUTH_SECRET;
            let password = req.body.password;
            let email = req.body.email;
            let user = await userModel.findOne({email:email});
            if(!user){
                return res.status(404).json({
                    status:"fail",
                    msg:"User not found"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            let payload = {
                id : user._id,
                role : user.role,
                email : user.email,
                exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
            }
            const token = jwt.sign(payload,key);
            if (isMatch){
                return res.status(201).json({
                    status:"success",
                    token : token
                });
            }else {
                return res.status(404).json({
                    status:"fail",
                    msg:"User not found"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg : "something went worng"
            });
        }
    };

    logout = async (req,res)=>{
        const userToken = parseUserToken(req)
        try {
            const filter = { email: userToken.email }
            const update = {token:""}
            let resp = await userModel.findOneAndUpdate(filter,update,{new:true});
            delete req.headers.authorization;
            return res.status(200).json({
                status : "success",
                data : resp,
                msg : "User logout successfully"
            });
        }catch (e) {
            return res.status(500).json({
                status :"fail",
                msg : e.toString()
            });
        }
    };


}

const authController = new authClass();

module.exports = authController;