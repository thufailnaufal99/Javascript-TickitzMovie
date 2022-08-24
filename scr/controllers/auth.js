const ctrl = {};

const model = require("../models/users");
const jwt = require("jsonwebtoken");
const respone = require("../helpers/respone");
const bcr = require("bcrypt");

const generateToken = async (username, role) => {
  try {
    const payload = {
      user: username,
      role: role,
    };
    const token = jwt.sign(payload, process.env.JWTkey, { expiresIn: "60m" });

    const result = {
      msg: `Anda login sebagai ${role}`,
      token: token,
    };
    return result;
  } catch (error) {
    throw error;
  }
};

ctrl.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await model.getByUsers(username);
    let role = user[0].role;
    if (user.length <= 0) {
      return respone(res, 401, "username tidak terdaftar", true);
    }
    const checkPassword = await bcr.compare(password, user[0].password);
    if (!checkPassword) {
      return respone(res, 401, "password salah", true);
    }
    const result = await generateToken(username, role);
    return respone(res, 200, result);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};
module.exports = ctrl;
