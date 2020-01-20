const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const uuidv4 = require('uuid/v4')
const server = require('../server')
const knex = require('../db/connection')
chai.use(chaiHttp)

const sinon = require('sinon')
const endpoints = require('../api/documents')

describe('DELETE /:id', () => {
  const sandbox = sinon.createSandbox()

  before(async () => {
    sandbox.stub(endpoints, 'delete')
  })

  afterEach(() => sandbox.reset())
  after(() => {
    sandbox.restore()
  })

  it('should return the document that was deleted', done => {
    knex('documents')
      .select('*')
      .then(documents => {
        const documentObject = documents[0]
        const lengthBeforeDelete = documents.length
        chai
          .request(server)
          .delete(`/${documentObject.id}`)
          .end((err, res) => {
            should.not.exist(err)
            res.status.should.equal(200)
            res.type.should.equal('application/json')
            res.body.status.should.eql('success')
            res.body.data[0].should.include.keys(
              'id',
              'type',
              'url',
              'owner_id',
              'deleted_at',
              'created_at',
              'updated_at'
            )
            // ensure the document was in fact deleted
            knex('documents')
              .select('*')
              .then(updateddocuments => {
                updateddocuments.length.should.eql(lengthBeforeDelete - 1)
                done()
              })
          })
      })
  })

  it('should throw an error if the document does not exist', done => {
    chai
      .request(server)
      .delete(`/${uuidv4()}`)
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(404)
        res.type.should.equal('application/json')
        res.body.status.should.eql('error')
        res.body.message.should.eql('That document does not exist.')
        done()
      })
  })
})
