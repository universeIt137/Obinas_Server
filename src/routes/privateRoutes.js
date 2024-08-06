const express = require("express");

const newsController = require("../controllers/ngo/news/newsController");

const authMiddleware = require("../middlewares/authMiddleware");

const mediaController = require("../controllers/ngo/media/mediaController");

const router = express.Router();

// news api

router.post("/post-news" , authMiddleware.isSuperAdmin, newsController.postNews );



// media api

router.post("/post-media" , authMiddleware.isSuperAdmin, mediaController.postMedia );


module.exports = router;