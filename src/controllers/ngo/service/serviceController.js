const serviceModel = require("../../../models/ngo/serviceModel");
const {parseUserToken} = require("../../../helper/helper");

class serviceClass {
    createService = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            const reqBody = req.body;

            if (userToken.role==="admin"){
                let data = await serviceModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow"
                });
            }

        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };
}


const serviceController = new serviceClass();

module.exports = serviceController;