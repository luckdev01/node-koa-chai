const knex = require('../db/connection')

const updateDocument = (id, data) => {
  return knex('documents')
    .update(data)
    .where({ id })
    .returning('*')
}

module.exports = updateDocument
