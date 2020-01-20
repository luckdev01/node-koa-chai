const knex = require('../db/connection')

const createDocument = data => {
  return knex('documents')
    .insert(data)
    .returning('*')
}

module.exports = createDocument
