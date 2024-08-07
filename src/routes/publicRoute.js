const express = require("express");

const router = express.Router();

//authController

const authController = require("../controllers/ngo/auth/authController");

// user controller

const userController = require("../controllers/ngo/users/userController");

// auth middleware

const authMiddleware = require("../middlewares/authMiddleware");

// about controller

const aboutController = require("../controllers/ngo/aboutUs/aboutUsController")


//auth route

router.post("/sign-up", authController.signUp);
router.get("/sign-in", authController.signIn );


// user api

router.get("/get-profile", authMiddleware.isValidUser, userController.getProfile );
router.put("/update-profile", authMiddleware.isValidUser, userController.updateUserProfile );

// about api

router.get("/all-about-data", aboutController.allAboutData );


module.exports = router;