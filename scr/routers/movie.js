const express = require('express')
const Router = express.Router()
const ctrl = require('../controllers/movie')
const authValidate = require('../middleware/authcheck')
const upload = require('../middleware/upload')

Router.get('/search', authValidate(["user", "admin"]), ctrl.searchingMovies)
Router.get('/:id_movie', authValidate(["user", "admin"]), ctrl.getByIDS)
Router.get('/', authValidate(["user", "admin"]), ctrl.getMovies)
Router.post('/', authValidate(["admin"]), upload.single('image'), ctrl.addMovie)
Router.put('/:id_movie', authValidate(["admin"]), upload.single('image'), ctrl.upMovie)
Router.delete('/:id_movie', authValidate(["admin"]), ctrl.delMovies)

module.exports = Router
