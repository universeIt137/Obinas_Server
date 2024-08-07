const express = require("express");
const newsController = require("../controllers/ngo/news/newsController");
const authMiddleware = require("../middlewares/authMiddleware");
const aboutUsController = require("../controllers/ngo/aboutUs/aboutUsController")

const router = express.Router();

router.post("/post-news", authMiddleware.isSuperAdmin, newsController.postNews);

router.get("/about", aboutUsController.aboutUs);


module.exports = router;