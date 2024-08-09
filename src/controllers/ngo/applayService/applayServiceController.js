const applayServiceModel = require("../../../models/ngo/applayServiceModel");
const {parseUserToken} = require("../../../helper/helper");

class applayServiceClass {
    applayServiceCreate = async (req,res)=>{
        const userToken = parseUserToken(req);
        try{
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await applayServiceModel.create(reqBody);
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
    getAllApplayService = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let data = await applayServiceModel.find();
            if (data.length===0){
                return res.status(404).json({
                    status:"fail",
                    msg : "Applay service not found"
                });
            }
            if (userToken.role==="admin"){
                let data = await applayServiceModel.find();
                return res.status(200).json({
                    status : "success",
                    data : data
                })
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

const applayServiceController = new applayServiceClass();

module.exports = applayServiceController;