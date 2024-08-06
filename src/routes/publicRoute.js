const express = require("express");

const router = express.Router();

const authController = require("../controllers/ngo/auth/authController");

router.post("/sign-up", authController.signUp);
router.get("/sign-in", authController.signIn )


module.exports = router;