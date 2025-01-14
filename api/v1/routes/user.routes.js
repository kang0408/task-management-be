const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

// Cần validate
router.post("/register", controller.register);

// Cần validate
router.post("/login", controller.login);

module.exports = router;
