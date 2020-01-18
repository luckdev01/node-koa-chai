'use strict'

// TODO start server here

const { Pool } = require('pg')
const config = require('config')
const client = new Pool({ connectionString: config.get('dbs.postgres.url') })

client.on('connect', () => {
  console.log({
    message: `postgres up and running`
  })
})

client.on('error', (err) => {
  console.log({
    message: `postgres connection error ${err.message.toString()}`
  })
})

client.query('SELECT 1').then(console.log, console.error)
