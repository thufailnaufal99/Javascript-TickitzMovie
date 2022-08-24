const ctrl = {};

const model = require("../models/movie");
const respone = require("../helpers/respone");




ctrl.getMovies = async (req, res) => {
  try {
    const pagination = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
      order: req.query.order
    }
    const movie = await model.getMovie(pagination);
    return respone(res, 200, movie);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.getByIDS = async (req, res) => {
  try {
    const id_movie = req.params.id_movie
    const movie = await model.getByID(id_movie);
    return respone(res, 200, movie);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.addMovie = async (req, res) => {
  try {
    const image = req.file.path;
    const movie = await model.saveMovie({ ...req.body, image });
    return respone(res, 200, movie);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.upMovie = async (req, res) => {
  try {
    const movie = await model.updateMovie({
      ...req.params,
      ...req.body,
      ...req.file,
    });
    return respone(res, 200, movie);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.delMovies = async (req, res) => {
  try {
    const id_movie = req.params
    const movie = await model.deleteMovie(id_movie);
    return respone(res, 200, movie);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

ctrl.searchingMovies = async (req, res) => {
  try {
    const title = req.query.title;
    const titleLower = title.toLowerCase();
    const movie = await model.searchMovie(titleLower);
    return respone(res, 200, movie);
  } catch (error) {
    return respone(res, 500, "terjadi error", true);
  }
};

module.exports = ctrl;
