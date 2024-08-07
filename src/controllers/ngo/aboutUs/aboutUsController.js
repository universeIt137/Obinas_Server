const aboutUsModel = require("../../../models/ngo/aboutUs");
const {parseUserToken} = require("../../../helper/helper");

class aboutClass {
    postAbout = async (req,res)=>{
        const userToken = parseUserToken(req);
        try {
            if (userToken.role==="super-admin"){
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
    };
    updateAbout = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = {
                _id : id
            };
            let reqBody = req.body;
            let aboutData = await aboutUsModel.findById(filter);
            if (!aboutData) return res.status(404).json({
                status : "fail",
                msg :  "About data not found"
            });

            if (userToken.role==="super-admin"){
                await aboutUsModel.findByIdAndUpdate(filter,reqBody);
                return res.status(200).json({
                    status : "success",
                    data : "Update successfully"
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
                msg : "Something went worng"
            });
        }
    };
    deleteAbout = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let id = req.params.id;
            let filter = {
                _id: id
            };
            let data = await aboutUsModel.findById(filter);
            if (!data) return res.status(404).json({
                status : "fail",
                msg : "Data not found"
            });

            if (userToken.role==="super-admin"){
                await aboutUsModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status : "success",
                    msg : "Data delete successfully"
                });
            }else{
                return res.status(403).json({
                    status : "success",
                    msg : "Permission not granted"
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : `Something went worng`
            });
        }
    };
    allAboutData = async (req,res)=>{
        try {
            let data = await aboutUsModel.find();
            return res.status(200).json({
                status : "success",
                data : data
            });
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : "Something went worng"
            });
        }
    };
    allAboutDataAdmin = async (req,res)=>{
        const parseToken = parseUserToken(req);
        try {
            if (parseToken.role==="super-admin"){
                let data = await aboutUsModel.find();
                return res.status(200).json({
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
                msg : "Something went worng"
            });
        }
    };

}

const aboutController = new aboutClass();

module.exports = aboutController;

