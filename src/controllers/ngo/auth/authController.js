const userModel = require("../../../models/ngo/userModel");
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");
const saltRounds = 10;

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
}

const authController = new authClass();

module.exports = authController;