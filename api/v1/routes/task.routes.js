const express = require("express");
const controller = require("../controllers/task.controller");

const router = express.Router();

router.get("", controller.tasks);

router.get("/details/:id", controller.detailsTask);

module.exports = router;
