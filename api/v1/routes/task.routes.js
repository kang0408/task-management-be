const express = require("express");
const controller = require("../controllers/task.controller");

const router = express.Router();

router.get("", controller.tasks);

router.get("/details/:id", controller.detailsTask);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.post("/create", controller.createTask);

router.patch("/edit/:id", controller.editTask);

module.exports = router;
