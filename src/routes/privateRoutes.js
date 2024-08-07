const express = require("express");

// News Controller
const newsController = require("../controllers/ngo/news/newsController");

// Auth Middleware
const authMiddleware = require("../middlewares/authMiddleware");

// Media Controller
const mediaController = require("../controllers/ngo/media/mediaController");

// Concern Controller
const concernController = require("../controllers/ngo/concern/concernController");

//About Controller
const aboutController = require("../controllers/ngo/aboutUs/aboutUsController");

//User Controller
const userController = require("../controllers/ngo/users/userController");

const router = express.Router();

// News api

router.post("/post-news" , authMiddleware.isSuperAdmin, newsController.postNews );


// Media api

router.post("/post-media" , authMiddleware.isSuperAdmin, mediaController.postMedia);

// Concern api

router.post("/post-concern" , authMiddleware.isSuperAdmin, concernController.postConcern);

// About api

router.post("/post-about" , authMiddleware.isSuperAdmin, aboutController.postAbout);
router.put("/update-about/:id" , authMiddleware.isSuperAdmin, aboutController.updateAbout);
router.delete("/delete-about/:id" , authMiddleware.isSuperAdmin, aboutController.deleteAbout);
router.get("/about-data-admin", authMiddleware.isSuperAdmin, aboutController.allAboutDataAdmin);

// User api

router.delete("/user-delete" , authMiddleware.isSuperAdmin, userController.deleteUser);
router.get("/all-user", authMiddleware.isSuperAdmin, userController.getAllUser);


module.exports = router;