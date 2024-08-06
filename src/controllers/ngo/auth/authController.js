const userModel = require("../../../models/ngo/userModel");

class authClass {
    signUp = async (req,res)=>{
        try {
            let {phone,email,password} = req.body;
            let userEmail = await userModel.findOne({email:email});
            if (userEmail){
                return res.status(409).json({
                    status:"success",
                    msg : "User email is already exists "
                });
            }
        }catch (e) {

        }
    }
}

const authController = new authClass();

module.exports = authController;