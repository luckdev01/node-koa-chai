const knex = require('../db/connection')

const deleteDocument = id => {
  return knex('documents')
    .del()
    .where({ id })
    .returning('*')
}

module.exports = deleteDocument
