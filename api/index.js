'use strict'

const Router = require('koa-router')
const documents = require('./documents')
const knex = require('../db/connection')

const router = new Router()

router.put('/schema', async ctx => {
  knex.migrate
    .latest()
    .then(function() {
      return knex.seed.run()
    })
    .then(function() {
      ctx.body = {
        status: 'success',
        message: 'Migrations are finished!'
      }
    })
})

router.post('/', documents.create)
// router.get('/', documents.list)
router.get('/:document', documents.read)
router.patch('/:document', documents.update)
router.delete('/:document', documents.delete)

router.get('/', async ctx => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  }
})

module.exports = router
