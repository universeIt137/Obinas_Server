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

}

const noticeController = new noticeClass();

module.exports = noticeController;