require("dotenv").config();
const express = require("express");
const cors = require("cors");
const server = express();
const main = require("./scr/main");
const DB = require("./scr/config/DB");

async function init() {
  try {
    await DB.connect();
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use("/images", express.static("images"));
    server.use("/api/v1", main);
    server.get("/", (req, res) => {
      res.send("Selamat datang di Tickitz");
    });
    const whitelist = [`http://localhost:${process.env.APP_PORT}`];
    const corsOptionsDelegate = function (req, callback) {
      let corsOptions;
      if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true };
      } else {
        corsOptions = { origin: false };
      }
      callback(null, corsOptions);
    };

    server.listen(process.env.APP_PORT, () => {
      console.log("Sever ready");
    });
  } catch (error) {
    console.log(error);
  }
}
init();
