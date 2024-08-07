const userModel = require("../../../models/ngo/userModel");
const {parseUserToken} = require("../../../helper/helper");

class userClass {
    getProfile = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            const userEmail = userToken.email;
            let filter = {
                email : userEmail
            };
            let data = await userModel.findOne(filter);

            if (!data){
                return res.status(404).json({
                    status : "fail",
                    msg : "User data not found"
                });
            }else {
                return res.status(200).json({
                    status : "success",
                    data : data
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : "Something went worng"
            });
        }
    };
    updateUserProfile = async (req,res)=>{
        const userToken = parseUserToken(req);
        const userEmail = userToken.email;
        try {
            let filter = {
                email: userEmail
            };
            let name = req.body.name;
            let phone = req.body.phone;
            let email = req.body.email;
            let updateData = {
                name : name,
                phone : phone,
                email : email
            };
            let userUpdateData = await userModel.findOneAndUpdate(filter,updateData);
            return res.status(200).json({
                status : "success",
                data : userUpdateData
            });
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : `something went worng ${e.toString()}`
            });
        }
    };

        deleteUser = async (req,res)=>{
        const userToken = parseUserToken(req);
        let userEmail = userToken.email;
        try {
            let filter = {
                email : userEmail
            };
            let userData = await userModel.findOne(filter);
            if (!userData) return res.status(404).json({
                status : "success",
                msg : "User not found"
            });
            if (userToken.role==="super-admin"){
                let data = await userModel.deleteOne(filter);
                return res.status(200).json({
                    status : "success",
                    data : data
                });
            }else {
                return res.status(404).json({
                    status :  "fail",
                    msg : "User not found"
                });
            }
        }catch (e) {
            return res.status(500).json({
            status :  "fail",
            msg : `Something went worng ${e}`
        });
        }
    }
}

const userController = new userClass();

module.exports = userController;