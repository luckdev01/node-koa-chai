'use strict'

// TODO start server here

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const indexRoutes = require('./api/index')
require('./db/connection')

const PORT = process.env.PORT || 1337

const app = new Koa()
app.use(bodyParser())
app.use(indexRoutes.routes())

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
