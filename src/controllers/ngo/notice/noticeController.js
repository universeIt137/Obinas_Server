const noticeModel = require("../../../models/ngo/noticeModel");
const {parseUserToken} = require("../../../helper/helper");
class noticeClass {
    postNotice = async (req,res)=>{
        const userToken = parseUserToken(req);
        try{
            if (userToken.role==="admin"){
                let reqBody = req.body;
                let data = await noticeModel.create(reqBody);
                return res.status(201).json({
                    status : 'success',
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
    getAllNotice = async (req,res)=>{
        try {
            let data = await noticeModel.find();
            if (data.length===0){
                return res.status(404).json({
                    status : "fail",
                    msg : "Notice not found"
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
    getSingleNotice = async (req,res)=>{
      try {
          let id = req.params.id;
          let filter = { _id : id };
          let data = await noticeModel.findById(filter);
          if(!data){
              return res.status(404).json({
                  status : "fail",
                  msg : "Notice not found"
              });
          }else {
              return res.status(200).json({
                  status : "success",
                  data : data
              });
          }
      }catch (e) {
          return res.status(500).json({
              status:"fail",
              msg : e.toString()
          });
      }
    };

    deleteNotice = async (req,res)=>{
        const userToken = parseUserToken(req)
        try {
            let id = req.params.id;
            let matchStage = { _id: id };
            let data = await noticeModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Notice not found"
            });
            if (userToken.role==="admin"){
                await noticeModel.findByIdAndDelete(matchStage);
                return res.status(200).json({
                    status : "success",
                    msg : "Notice delete successfully"
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
}

const noticeController = new noticeClass();

module.exports = noticeController;