const express = require("express");
const newsController = require("../controllers/ngo/news/newsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/post-news" , authMiddleware.isSuperAdmin, newsController.postNews );


module.exports = router;