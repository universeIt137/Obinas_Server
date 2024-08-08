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

//auth api
router.post("/sign-up", authController.signUp);
router.get("/sign-in", authController.signIn );


// user api
router.get("/get-profile", authMiddleware.isValidUser, userController.getProfile );
router.put("/update-profile", authMiddleware.isValidUser, userController.updateUserProfile );

// about api
router.get("/all-about-data", aboutController.allAboutData );

// concern api
router.get("/all-concern-data", concernController.getAllConcern);

// news api
router.get("/all-news", newsController.getAllNews );

// media api
router.get("/get-all-media" , mediaController.getAllMedia );

// job circular api

router.get("/get-all-job-circular", jobCircularController.getAllJobCircular)


module.exports = router;