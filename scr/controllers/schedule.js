const ctrlScd = {};
const modelScd = require("../models/schedule");
const respone = require("../helpers/respone");

//Schedule
ctrlScd.getSchedules = async (req, res) => {
  try {
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
      order: req.query.order
    }
    const schedule = await modelScd.getSchedule(pagination);
    return respone(res, 200, schedule);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrlScd.addSchedule = async (req, res) => {
  try {
    const { location, price, date_start, date_end, premiere, time } = req.body;
    const schedule = await modelScd.saveSchedule({
      location,
      price,
      date_start,
      date_end,
      premiere,
      time,
    });
    return respone(res, 200, schedule);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrlScd.upSchedule = async (req, res) => {
  try {
    const id_schedule = req.params.id_schedule;
    const { location, price, date_start, date_end, premiere, time } = req.body;
    const schedule = await modelScd.updateSchedule(id_schedule, {
      location,
      price,
      date_start,
      date_end,
      premiere,
      time,
    });
    return respone(res, 200, schedule);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrlScd.delSchedule = async (req, res) => {
  try {
    const id_schedule = req.params.id_schedule;
    const { location, price, date_start, date_end, premiere, time } = req.body;
    const schedule = await modelScd.deleteSchedule(id_schedule, {
      location,
      price,
      date_start,
      date_end,
      premiere,
      time,
    });
    return respone(res, 200, schedule);
  } catch (err) {
    return respone(res, 500, "terjadi error", true);
  }
};

module.exports = ctrlScd;
