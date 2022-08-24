const ctrl = {};

const model = require("../models/users");
const hashing = require("../helpers/hash");
const respone = require("../helpers/respone");

ctrl.getUser = async (req, res) => {
  try {
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
      order: req.query.order
    }
    const users = await model.getUsers(pagination);
    return respone(res, 200, users);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.getByUsername = async (req, res) => {
  try {
    const users = await model.getByUsers(req.decode.user);
    return respone(res, 200, users);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.addUsers = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashPassword = await hashing(password);
    const users = await model.saveUsers({ username, hashPassword, role });
    return respone(res, 200, users);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.upUsers = async (req, res) => {
  try {
    const uname = req.decode.user
    const { username, password, role } = req.body;
    let Password;
    if (password) {
      Password = await hashing(password);
    } else {
      Password = password;
    }
    const users = await model.updateUsers(uname, {
      username,
      Password,
      role,
    });
    return respone(res, 200, users);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.delUsers = async (req, res) => {
  try {
    const uname = req.params.username;
    const { username, password, role } = req.body;
    const users = await model.deleteUsers(uname, { username, password, role });
    return respone(res, 200, users);
  } catch (err) {
    return respone(res, 500, "terjadi error", true);
  }
};

module.exports = ctrl;
