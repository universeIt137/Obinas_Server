const contactUsModel = require("../../../models/ngo/contactModel");
const {parseUserToken} = require("../../../helper/helper");

class contactClass {
    createContact = async (req,res)=>{
        let userToken = parseUserToken(req);
        try{
            let reqBody = req.body;
            if (userToken.role==="admin" || userToken.role==="user" ){
                let data = await contactUsModel.create(reqBody);
                return res.status(201).json({
                    status : "success",
                    data : data
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
    getAllContact = async (req,res)=>{
        const userToken = parseUserToken(req)
        try {
            let data = await contactUsModel.find();
            if (data.length===0) return res.status(404).json({
                status : "fail",
                msg : "Contact data not found"
            });
            if ( userToken.role==="user" || userToken.role==="admin" ){
                let data = await contactUsModel.find();
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
                msg : e.toString()
            });
        }
    };

}

const contactUsController = new contactClass();

module.exports = contactUsController;