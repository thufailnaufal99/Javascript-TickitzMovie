const express = require("express");
const Router = express.Router();
const ctrl = require("../controllers/users");
const authValidate = require("../middleware/authcheck");

Router.get("/", authValidate(["admin"]), ctrl.getUser);
Router.get("/info", authValidate(["admin", "user"]), ctrl.getByUsername);
Router.post("/", ctrl.addUsers);
Router.put("/", authValidate(["admin", "user"]), ctrl.upUsers);
Router.delete("/:username", authValidate(["admin"]), ctrl.delUsers);

module.exports = Router;
