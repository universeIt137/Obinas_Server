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

// contact us controller
const contactUsController = require("../controllers/ngo/contactUs/contactUsController");

const router = express.Router();

// News api

router.post("/post-news" , authMiddleware.isSuperAdmin, newsController.postNews );
router.put("/update-news/:id" , authMiddleware.isSuperAdmin, newsController.updateNews);
router.delete("/delete-news/:id", authMiddleware.isSuperAdmin, newsController.deleteNews);
router.get("/get-all-data-admin", authMiddleware.isSuperAdmin, newsController.getAllNewsAdmin);


// Media api
router.post("/post-media" , authMiddleware.isSuperAdmin, mediaController.postMedia);
router.put("/update-media/:id" , authMiddleware.isSuperAdmin, mediaController.updateMedia);
router.delete("/delete-media/:id" , authMiddleware.isSuperAdmin, mediaController.deleteMedia);
router.get("/media-data-admin", authMiddleware.isSuperAdmin, mediaController.getAllMediaAdmin);

// Concern api
router.post("/post-concern" , authMiddleware.isSuperAdmin, concernController.postConcern);
router.put("/update-concern/:id", authMiddleware.isSuperAdmin, concernController.updateConcern );
router.delete("/delete-concern/:id", authMiddleware.isSuperAdmin, concernController.deleteConcern );
router.get("/all-concern-data-admin" ,  authMiddleware.isSuperAdmin, concernController.getAllConcernDataAdmin);

// About api

router.post("/post-about" , authMiddleware.isSuperAdmin, aboutController.postAbout);
router.put("/update-about/:id" , authMiddleware.isSuperAdmin, aboutController.updateAbout);
router.delete("/delete-about/:id" , authMiddleware.isSuperAdmin, aboutController.deleteAbout);
router.get("/about-data-admin", authMiddleware.isSuperAdmin, aboutController.allAboutDataAdmin);

// User api

router.delete("/user-delete" , authMiddleware.isSuperAdmin, userController.deleteUser);
router.get("/all-user", authMiddleware.isSuperAdmin, userController.getAllUser);


// contact us api

router.post("/create-contact" , authMiddleware.isValidUser, contactUsController.createContact);
router.get("/get-all-contact", authMiddleware.isValidUser, contactUsController.getAllContact);
router.get("/get-single-contact/:id" , authMiddleware.isValidUser, contactUsController.getSingleContact);


module.exports = router;