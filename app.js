require("dotenv").config()
const express = require("express");
const server = express();
const main = require("./scr/main");
const DB = require("./scr/config/DB");

async function init() {
  try {
    await DB.connect();
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use("/images", express.static("images"))
    server.use("/api/v1", main);
    server.get('/', (req, res) => {
      res.send("Selamat datang di Tickitz")
    })

    server.listen(process.env.APP_PORT, () => {
      console.log("Sever ready");
    });
  } catch (error) {
    console.log(error);
  }
}
init();
