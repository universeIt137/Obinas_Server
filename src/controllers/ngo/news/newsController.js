const newsModel = require("../../../models/ngo/newsModel");
const {parseUserToken} = require("../../../helper/helper");

class newsClass {
    postNews = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            let {title,keyword} = req.body;
            if (!title){
                return res.status(428).json({
                    status : "fail",
                    msg : "Title required"
                });
            }else if (!keyword){
                return res.status(428).json({
                    status:"fail",
                    msg : "Keyword required"
                });
            }else {
                if ((userToken.role==="super-admin") ){
                    let reqBody = req.body;
                    let data = await newsModel.create(reqBody);
                    return res.status(201).json({
                        status:"success",
                        msg : data
                    });
                }else {
                    return res.status(403).json({
                        status:"fail",
                        msg:"Permission not allow"
                    });
                }
            }

        }catch (e) {
            return res.status(500).json({
                status:"fail",
                msg : "Something went worng"
            });
        }
    };
    updateNews = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            const id = req.params.id;
            const matchStage = {
                _id : id
            };
            const reqBody = req.body;
            let data = await newsModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "success",
                msg : "Data not found"
            });
            if ( userToken.role==="super-admin" ){
                await newsModel.findByIdAndUpdate(matchStage,reqBody);
                return res.status(200).json({
                    status : "success",
                    msg : `Update successfully`
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : 'Permission not granted'
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    deleteNews = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            const id = req.params.id;
            let matchStage = {
                _id: id
            };
            const data = await newsModel.findById(matchStage);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found "
            });
            if (userToken.role==="super-admin"){
                await newsModel.findByIdAndDelete(matchStage);
                return res.status(200).json({
                    status : 'success',
                    msg : "Delete successfully"
                });
            }else {
                return res.status(500).json({
                    status : "fail",
                    msg : "Permission not granted"
                });
            }
        }catch (e){
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    getAllNews = async (req,res)=>{
        try {
            let data = await newsModel.find();
            if ( data.length===0 ){
                return res.status(404).json({
                    status : "fail",
                    msg : "Data not found"
                });
            }else {
                return res.status(200).json({
                    status : 'success',
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

const newsController = new newsClass();

module.exports = newsController;