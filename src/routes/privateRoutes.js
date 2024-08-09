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

// job circular controller
const jobCircularController = require("../controllers/ngo/jobCircular/jobCircularController");

// notice controller

const noticeController = require("../controllers/ngo/notice/noticeController");

// service controller

const serviceController = require("../controllers/ngo/service/serviceController");

// applay service controller

const applayServiceController = require("../controllers/ngo/applayService/applayServiceController");

const router = express.Router();

// News api

router.post("/post-news" , authMiddleware.isValidUser, newsController.postNews );
router.delete("/delete-news/:id", authMiddleware.isValidUser, newsController.deleteNews);


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
router.delete("/delete-contact/:id" , authMiddleware.isValidUser, contactUsController.deleteContact);

// job circular api

router.post("/post-job-circular", authMiddleware.isValidUser, jobCircularController.postJobCircular);
router.delete("/job-circular-delete/:id" , authMiddleware.isValidUser, jobCircularController.deleteJobCircular);

// notice api

router.post("/post-notice", authMiddleware.isValidUser, noticeController.postNotice);
router.delete("/delete-notice/:id", authMiddleware.isValidUser, noticeController.deleteNotice);

// service api

router.post("/create-service", authMiddleware.isValidUser, serviceController.createService);
router.delete("/delete-service/:id" , authMiddleware.isValidUser, serviceController.deleteService);

// applay service api

router.post("/applay-service", authMiddleware.isValidUser, applayServiceController.applayServiceCreate);
router.get("/get-all-applay-service", authMiddleware.isValidUser, applayServiceController.getAllApplayService);

module.exports = router;