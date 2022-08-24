const model = {};
const DB = require("../config/DB");
const format = require("pg-format");

model.getUsers = async (pagination) => {
  try {
    let query = format(`SELECT * FROM public.users`);
    if (pagination.order) {
      query = format(`${query} ORDER BY %s DESC`, pagination.order);
    } else {
      query = format(`${query} ORDER BY created_at DESC`);
    }
    const offset = (pagination.page - 1) * pagination.limit;
    query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset);
    const users = await DB.query(query);
    return users.rows;
  } catch (error) {
    throw error;
  }
};

model.getByUsers = (username) => {
  return new Promise((resolve, reject) => {
    DB.query(`SELECT * FROM public.users WHERE username=$1;`, [username])
      .then((users) => {
        resolve(users.rows);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

model.saveUsers = (users) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `INSERT INTO public.users (username, "password", role) VALUES($1, $2, $3);`,
      [users.username, users.hashPassword, users.role]
    )
      .then((users) => {
        resolve("Data users berhasil disimpan");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

model.updateUsers = (uname, users) => {
  const query = `UPDATE public.users
   SET 
       username = COALESCE(NULLIF($1, ''), username),
       password = COALESCE(NULLIF($2, ''), password),
       role = COALESCE(NULLIF($3, ''), role)
       WHERE username= $4`;
  return new Promise((resolve, reject) => {
    DB.query(query, [users.username, users.Password, users.role, uname])
      .then(() => {
        resolve("Data users berhasil diupdate");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

model.deleteUsers = (uname) => {
  return new Promise((resolve, reject) => {
    DB.query(`DELETE FROM public.users WHERE username=$1`, [uname])
      .then(() => {
        resolve("Data users berhasil dihapus");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = model;
