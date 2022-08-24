const modelScd = {};
const DB = require("../config/DB");
const format = require("pg-format")

modelScd.getSchedule = async (pagination) => {
  try {
    let query = format(`SELECT * FROM public.schedule`);
    if (pagination.order) {
      query = format(`${query} ORDER BY %s DESC`, pagination.order);
    } else {
      query = format(`${query} ORDER BY id_schedule DESC`);
    }
    const offset = (pagination.page - 1) * pagination.limit;
    query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset);
    const schedule = await DB.query(query)
    return schedule.rows;
  } catch (error) {
    throw error;
  }
};

modelScd.saveSchedule = (Schedule) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `INSERT INTO public.schedule ("location", price, date_start, date_end, premiere, "time") VALUES($1, $2, $3, $4, $5, $6);`,
      [
        Schedule.location,
        Schedule.price,
        Schedule.date_start,
        Schedule.date_end,
        Schedule.premiere,
        Schedule.time,
      ]
    )
      .then((Schedule) => {
        resolve("Data schedule berhasil disimpan");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

modelScd.updateSchedule = (id, Schedule) => {
  const query = `UPDATE public.schedule
   SET 
       location = COALESCE(NULLIF($1, ''), location),
       price = COALESCE(NULLIF($2, ''), price),
       date_start = COALESCE(NULLIF($3, CURRENT_DATE), date_start),
       date_end = COALESCE(NULLIF($4, CURRENT_DATE), date_end),
       premiere = COALESCE(NULLIF($5, ''), premiere),
       time = COALESCE(NULLIF($6, ''), time)
       WHERE id_schedule= $7`;
  return new Promise((resolve, reject) => {
    DB.query(query, [
      Schedule.location,
      Schedule.price,
      Schedule.date_start,
      Schedule.date_end,
      Schedule.premiere,
      Schedule.time,
      id,
    ])
      .then(() => {
        resolve("Data schedule berhasil diupdate");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

modelScd.deleteSchedule = (id_schedule) => {
  return new Promise((resolve, reject) => {
    DB.query(`DELETE FROM public.schedule WHERE id_schedule=$1`, [id_schedule])
      .then(() => {
        resolve("Data schedule berhasil dihapus");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = modelScd;
