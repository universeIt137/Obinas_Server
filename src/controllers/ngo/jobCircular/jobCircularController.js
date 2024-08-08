const jobCircularModel = require("../../../models/ngo/jobCircularModel");
const {parseUserToken} = require("../../../helper/helper");

class jobCircularClass {
    postJobCircular = async (req,res)=>{
        let userToken = parseUserToken(req);
        try {
            let reqBody = req.body;
            if (userToken.role==="admin"){
                let data = await jobCircularModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    data : data
                });
            }else {
                return res.status(403).json({
                    status : "fail",
                    msg : "Permission not allow "
                });
            }
        }catch (e) {
            return res.status(500).json({
                status : "fail",
                msg : e.toString()
            });
        }
    };

    getAllJobCircular = async (req,res) =>{
        try {
            let data = await jobCircularModel.find();
            if (data.length===0) {
                return res.status(404).json({
                    status : "fail",
                    msg : "Job circular not found"
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
    
    getSingleJobCircular = async (req,res)=>{
        try {
            let id = req.params.id;
            let matchStage = { _id : id };
            let data = await jobCircularModel.findById(matchStage);
            if (!data) {
                return res.status(404).json({
                    status : "fail",
                    msg : "job circular not found"
                })
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

}

const jobCircularController = new jobCircularClass();

module.exports = jobCircularController;