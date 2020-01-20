'use strict'

const createDocument = require('../lib/create-document')
const { getDocuments, getDocumentBy } = require('../lib/get-documents')
const updateDocument = require('../lib/update-document')
const deleteDocument = require('../lib/delete-document')

exports.create = async ctx => {
  try {
    const document = await createDocument(ctx.request.body)
    ctx.status = 201
    ctx.body = {
      status: 'success',
      data: document
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
}

exports.list = async ctx => {
  try {
    const documents = await getDocuments()
    ctx.body = {
      status: 'success',
      data: documents
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
}

exports.read = async ctx => {
  try {
    const document = await getDocumentBy(ctx.params.document)
    if (document.length) {
      ctx.body = {
        status: 'success',
        data: document[0]
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That document does not exist.'
      }
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
}

exports.update = async ctx => {
  try {
    const document = await updateDocument(ctx.params.document, ctx.request.body)
    if (document.length) {
      ctx.status = 200
      ctx.body = {
        status: 'success',
        data: document
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That document does not exist.'
      }
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
}

exports.delete = async ctx => {
  try {
    const document = await deleteDocument(ctx.params.document)
    if (document.length) {
      ctx.status = 200
      ctx.body = {
        status: 'success',
        data: document
      }
    } else {
      ctx.status = 404
      ctx.body = {
        status: 'error',
        message: 'That document does not exist.'
      }
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
}
