const modelBook = {};
const DB = require("../config/DB");
const format = require("pg-format")

modelBook.getBooking = async (pagination) => {
  try {
    let query = format(`SELECT * FROM public.booking`);
    if (pagination.order) {
      query = format(`${query} ORDER BY %s DESC`, pagination.order);
    } else {
      query = format(`${query} ORDER BY id_booking DESC`);
    }
    const offset = (pagination.page - 1) * pagination.limit;
    query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset);
    const booking = await DB.query(query)
    return booking.rows;
  } catch (error) {
    throw error;
  }
};

modelBook.saveBooking = (booking) => {
  return new Promise((resolve, reject) => {
    DB.query(`INSERT INTO public.booking (studio, seat) VALUES($1, $2);`, [
      booking.studio,
      booking.seat,
    ])
      .then((booking) => {
        resolve("Data booking berhasil disimpan");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

modelBook.updateBooking = (id, booking) => {
  const query = `UPDATE public.booking 
   SET 
       studio = COALESCE(NULLIF($1, ''), studio),
       seat = COALESCE(NULLIF($2, ''), seat)
       WHERE id_booking= $3`;
  return new Promise((resolve, reject) => {
    DB.query(query, [booking.studio, booking.seat, id])
      .then(() => {
        resolve("Data booking berhasil diupdate");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

modelBook.deleteBooking = (id_booking) => {
  return new Promise((resolve, reject) => {
    DB.query(`DELETE FROM public.booking WHERE id_booking=$1`, [id_booking])
      .then(() => {
        resolve("Data booking berhasil dihapus");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = modelBook;
