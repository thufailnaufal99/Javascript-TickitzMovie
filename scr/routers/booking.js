const express = require("express");
const Router = express.Router();
const ctrl = require("../controllers/booking");
const authValidate = require('../middleware/authcheck')

Router.get("/", authValidate(["admin", "user"]), ctrl.getBookings);
Router.post("/", authValidate(["admin"]), ctrl.addBooking);
Router.put("/:id_booking", authValidate(["admin"]), ctrl.upBooking);
Router.delete("/:id_booking", authValidate(["admin"]), ctrl.delBooking);

module.exports = Router;
