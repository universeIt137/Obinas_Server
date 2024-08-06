const express = require("express");

const router = express.Router();

const authController = require("../controllers/ngo/auth/authController");

router.post("/user-create", authController.signUp);


module.exports = router;