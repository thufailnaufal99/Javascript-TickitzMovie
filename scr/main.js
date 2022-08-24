const express = require('express')
const routers = express.Router()

const movie = require('./routers/movie')
const schedule = require('./routers/schedule')
const booking = require('./routers/booking')
const users = require('./routers/users')
const auth = require('./routers/auth')

routers.use('/movie', movie)
routers.use('/schedule', schedule)
routers.use('/booking', booking)
routers.use('/users', users)
routers.use('/auth', auth)

module.exports = routers
