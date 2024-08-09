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
    getAllService = async (req,res)=>{
        try {
            let data = await serviceModel.find();
            if (data.length===0){
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

        }
    };
    getSingleService = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let data = await serviceModel.findById(filter);
            if (!data){
                return res.status(404).json({
                    status : "fail",
                    msg : "Service not found"
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


const serviceController = new serviceClass();

module.exports = serviceController;