const concernModel = require("../../../models/ngo/ourConcernModel");
const {parseUserToken} = require("../../../helper/helper");

class concernClass  {
    postConcern = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="super-admin"){
                let data = await concernModel.create(reqBody);
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

    updateConcern = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = {
                _id : id
            };
            let reqBody = req.body;
            let data = await concernModel.findOne(filter);
            if (!data) return res.status(404).json({
                status :  "fail",
                msg : "Data not found"
            });
            if (userToken.role==="super-admin"){
                await concernModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status : "success",
                    msg : "Update successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : " Permission not allow "
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    deleteConcern = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = {
                _id: id
            };
            let data = await concernModel.findById(filter);
            if (!data) return res.status(404).json({
                status : "success",
                msg : "Data not found"
            });
            if ((userToken.role==="super-admin")){
                await concernModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status:"success",
                    msg : "Delete successfully"
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not granted"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    }

}

const concernController = new concernClass();

module.exports = concernController;