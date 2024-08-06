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
                if ((userToken.role==="super_admin") ){
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
}

const newsController = new newsClass();

module.exports = newsController;