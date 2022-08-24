const ctrlBook = {};

const modelBook = require("../models/booking");
const respone = require("../helpers/respone");

ctrlBook.getBookings = async (req, res) => {
  try {
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
      order: req.query.order
    }
    const booking = await modelBook.getBooking(pagination);
    return respone(res, 200, booking);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};
 
ctrlBook.addBooking = async (req, res) => {
  try {
    const { studio, seat } = req.body;
    const booking = await modelBook.saveBooking({ studio, seat });
    return respone(res, 200, booking);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrlBook.upBooking = async (req, res) => {
  try {
    const id_booking = req.params.id_booking
    const { studio, seat } = req.body;
    const booking= await modelBook.updateBooking(id_booking, {studio, seat});
    return respone(res, 200, booking);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrlBook.delBooking = async(req, res) => {
  try {
      const id_booking = req.params.id_booking
      const { studio, seat } = req.body
      const booking = await modelBook.deleteBooking(id_booking, {studio, seat})
      return respone(res, 200, booking)
  } catch (err) {
    return respone(res, 500, "terjadi error", true)
  }
}




module.exports = ctrlBook;