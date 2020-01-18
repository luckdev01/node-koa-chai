'use strict'

const Router = require('koa-router')
const createTable = require('lib/create-table')
const documents = require('./documents')

const router = new Router()

router.put('/schema', async (ctx) => {
  ctx.body = await createTable()
})

router.post('/', documents.create)
router.get('/', documents.list)
router.get('/:document', documents.read)
router.patch('/:document', documents.update)
router.delete('/:document', documents.delete)

module.exports = () => router.middleware()
