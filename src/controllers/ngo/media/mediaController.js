const mediaModel = require("../../../models/ngo/mediaModel");
const {parseUserToken} = require("../../../helper/helper");

class mediaClass {
    postMedia = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="super_admin"){
                let data = await mediaModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    msg : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg:"something went worng"
            });
        }
    };

}

const mediaController = new mediaClass();

module.exports = mediaController