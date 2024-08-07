const aboutUsModel = require("../../../models/ngo/aboutUs");
const {parseUserToken} = require("../../../helper/helper");

class aboutClass {
    postAbout = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            if (userToken.role==="super_admin"){
                let reqBody = req.body;
                let data = await aboutUsModel.create(reqBody);
                return res.status(201).json({
                    status:"success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status:"fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : "something went worng"
            });
        }
    }
}

const aboutController = new aboutClass();

module.exports = aboutController;

