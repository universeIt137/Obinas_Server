const express = require("express");

const router = express.Router();

//authController

const authController = require("../controllers/ngo/auth/authController");

// user controller

const userController = require("../controllers/ngo/users/userController");

// auth middleware

const authMiddleware = require("../middlewares/authMiddleware");


//auth route

router.post("/sign-up", authController.signUp);
router.get("/sign-in", authController.signIn );


// user route

router.get("/get-profile", authMiddleware.isValidUser, userController.getProfile );
router.put("/update-profile", authMiddleware.isValidUser, userController.updateUserProfile );


module.exports = router;