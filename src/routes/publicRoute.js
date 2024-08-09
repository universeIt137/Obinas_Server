const express = require("express");

const router = express.Router();

//authController

const authController = require("../controllers/ngo/auth/authController");

// user controller
const userController = require("../controllers/ngo/users/userController");

// auth middleware
const authMiddleware = require("../middlewares/authMiddleware");

// about controller
const aboutController = require("../controllers/ngo/aboutUs/aboutUsController");

// concern controller
const concernController = require("../controllers/ngo/concern/concernController");

// news controller
const newsController = require("../controllers/ngo/news/newsController");

// media controller
const mediaController = require("../controllers/ngo/media/mediaController");

// job circular controller
const jobCircularController = require("../controllers/ngo/jobCircular/jobCircularController");

// notice controller

const noticeController = require("../controllers/ngo/notice/noticeController");

// service controller

const serviceController = require("../controllers/ngo/service/serviceController");


//auth api
router.post("/sign-up", authController.signUp);
router.get("/sign-in", authController.signIn );
router.get("/logout", authController.logout );


// user api
router.get("/get-profile", authMiddleware.isValidUser, userController.getProfile );
router.put("/update-profile", authMiddleware.isValidUser, userController.updateUserProfile );

// about api
router.get("/all-about-data", aboutController.allAboutData );

// concern api
router.get("/all-concern-data", concernController.getAllConcern);

// news api
router.get("/all-news", newsController.getAllNews );
router.get("/get-single-news/:id" , newsController.getSingleNews );

// media api
router.get("/get-all-media" , mediaController.getAllMedia );

// job circular api

router.get("/get-all-job-circular", jobCircularController.getAllJobCircular);
router.get("/single-job-circular/:id", jobCircularController.getSingleJobCircular);

// notice api

router.get("/get-all-notice", noticeController.getAllNotice);
router.get("/single-notice/:id", noticeController.getSingleNotice );

// service api

router.get("/get-all-service", serviceController.getAllService );
router.get("/get-single-service/:id", serviceController.getSingleService );


module.exports = router;