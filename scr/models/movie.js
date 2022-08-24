const model = {};
const DB = require("../config/DB");
const format = require("pg-format");
const cloudinary = require("../helpers/cloudinary");

model.getMovie = async (pagination) => {
  try {
    let query = format(`SELECT * FROM public.movie`);
    if (pagination.order) {
      query = format(`${query} ORDER BY %s DESC`, pagination.order);
    } else {
      query = format(`${query} ORDER BY id_movie DESC`);
    }
    const offset = (pagination.page - 1) * pagination.limit;
    query = format(`${query} LIMIT %s OFFSET %s`, pagination.limit, offset);
    const movie = await DB.query(query);
    return movie.rows;
  } catch (error) {
    throw error;
  }
};

model.getByID = async (id_movie) => {
  try {
    const movie = await DB.query(
      `SELECT * FROM public.movie WHERE id_movie=$1`,
      [id_movie]
    );
    return movie.rows;
  } catch (error) {
    throw error;
  }
};

model.saveMovie = async (movie) => {
  try {
    const pushImage = await cloudinary.push(movie.image);
    DB.query(
      "INSERT INTO public.movie (title, genre, release_date, duration, directed_by, casts, age_rating, score, synopsys, image) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        movie.title,
        movie.genre,
        movie.release_date,
        movie.duration,
        movie.directed_by,
        movie.casts,
        movie.age_rating,
        movie.score,
        movie.synopsys,
        pushImage.secure_url,
      ]
    );
    return "Data berhasil disimpan";
  } catch (error) {
    throw error;
  }
};

model.updateMovie = async (data) => {
  try {
    let image = "";
    if (data.path) {
      const movie = await DB.query(
        "SELECT * FROM public.movie WHERE id_movie=$1",
        [data.id_movie]
      );
      await cloudinary.delete(movie);
      const upload = await cloudinary.push(data.path);
      image = upload.secure_url;
    }
    await DB.query(
      `UPDATE public.movie 
     SET 
         title = COALESCE(NULLIF($1, ''), title),
         genre = COALESCE(NULLIF($2, ''), genre),
         release_date = COALESCE(NULLIF($3, CURRENT_DATE), release_date),
         duration = COALESCE(NULLIF($4, ''), duration),
         directed_by = COALESCE(NULLIF($5, ''), directed_by),
         casts = COALESCE(NULLIF($6, ''), casts),
         age_rating = COALESCE(NULLIF($7, ''), age_rating),
         score = COALESCE(NULLIF($8, 0), score),
         synopsys = COALESCE(NULLIF($9, ''), synopsys),
         image = COALESCE(NULLIF($10, ''), image)
         WHERE id_movie= $11`,
      [
        data.title,
        data.genre,
        data.release_date,
        data.duration,
        data.directed_by,
        data.casts,
        data.age_rating,
        data.score,
        data.synopsys,
        image,
        data.id_movie,
      ]
    );
    return "Data berhasil diubah";
  } catch (error) {
    throw error;
  }
};

model.deleteMovie = async (data) => {
  try {
    const movie = await DB.query(
      `SELECT * FROM public.movie WHERE id_movie=$1`,
      [data.id_movie]
    );
    await cloudinary.delete(movie);
    await DB.query("DELETE FROM public.movie WHERE id_movie=$1", [
      data.id_movie,
    ]);
    return "Data berhasil dihapus";
  } catch (error) {
    throw error;
  }
};

model.searchMovie = async (titleLower) => {
  try {
    const movie = await DB.query(
      `SELECT * FROM public.movie WHERE LOWER(title) LIKE $1`,
      [`%${titleLower}%`]
    );
    return movie.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = model;
