const mediaModel = require("../../../models/ngo/mediaModel");
const {parseUserToken} = require("../../../helper/helper");

class mediaClass {
    postMedia = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"){
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
            if (userToken.role==="admin"){
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
    
    getAllMedia = async (req,res)=>{
        try {
            let data = await mediaModel.find();
            if ( data.length===0 ) {
                return res.status(404).json({
                    status : 'fail',
                    msg : "Data not found"
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
                msg : e.toString()
            });
        }
    };

}

const mediaController = new mediaClass();

module.exports = mediaController