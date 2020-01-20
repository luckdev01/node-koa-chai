const knex = require('../db/connection')

const getDocuments = () => {
  return knex('documents').select('*')
}

const getDocumentBy = id => {
  return knex('documents')
    .select('*')
    .where('id', '=', id)
}

module.exports = { getDocuments, getDocumentBy }
