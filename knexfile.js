// Update with your config settings.
const config = require('config')
const path = require('path')
const BASE_PATH = path.join(__dirname, 'db')

module.exports = {
  development: {
    client: 'pg',
    connection: config.get('dbs.postgres.url'),
    migrations: {
      directory: path.join(BASE_PATH, 'migrations')
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds')
    }
  }
}
