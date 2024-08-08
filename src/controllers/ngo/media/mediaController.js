const mediaModel = require("../../../models/ngo/mediaModel");
const {parseUserToken} = require("../../../helper/helper");

class mediaClass {
    postMedia = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="super-admin"){
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
    updateMedia = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let matchStage = {
                _id : id
            };
            let reqBody = req.body;

            let data = await mediaModel.findById( matchStage );

            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });

            if (userToken.role==="super-admin"){
                await mediaModel.findByIdAndUpdate(matchStage,reqBody);
                return res.status(200).json({
                    status : "success",
                    msg : "Update successfully"
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
    };
    deleteMedia = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let matchStage = {
                _id: id
            };
            let data = await mediaModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });
            if (userToken.role==="super-admin"){
                await mediaModel.findByIdAndDelete(matchStage);
                return res.status(200).json({
                    status : "success",
                    msg : "Delete successfully"
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

const mediaController = new mediaClass();

module.exports = mediaController