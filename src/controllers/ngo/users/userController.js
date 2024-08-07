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
    }
}

const userController = new userClass();

module.exports = userController;