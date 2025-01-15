const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

// Cần validate
router.post("/register", controller.register);

// Cần validate
router.post("/login", controller.login);

// Cần validate
router.post("/password/forgot", controller.forgotPassword);

router.post("password/otp", controller.verifyOTP);

router.post("password/reset", controller.resetPassword);

router.get("/details", controller.details)

module.exports = router;
