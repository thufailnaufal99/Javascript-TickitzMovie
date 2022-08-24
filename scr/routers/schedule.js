const express = require("express");
const Router = express.Router();
const ctrl = require("../controllers/schedule");
const authValidate = require('../middleware/authcheck')

Router.get("/", authValidate(["user", "admin"]), ctrl.getSchedules)
Router.post("/", authValidate(["admin"]), ctrl.addSchedule)
Router.put("/:id_schedule", authValidate(["admin"]), ctrl.upSchedule)
Router.delete("/:id_schedule", authValidate(["admin"]), ctrl.delSchedule);

module.exports = Router
