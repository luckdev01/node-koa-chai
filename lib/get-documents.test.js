const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const knex = require('../db/connection')
chai.use(chaiHttp)

describe('GET /', () => {
  it('should return all documents', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.status.should.eql('success')
        res.body.data.length.should.eql(3)
        res.body.data[0].should.include.keys(
          'id',
          'type',
          'url',
          'owner_id',
          'deleted_at',
          'created_at',
          'updated_at'
        )
        done()
      })
  })

  it('should return the document by id', done => {
    knex('documents')
      .select('*')
      .then(document => {
        const documentObject = document[0]
        chai
          .request(server)
          .get(`/${documentObject.id}`)
          .end((err, res) => {
            should.not.exist(err)
            res.status.should.equal(200)
            res.type.should.equal('application/json')
            res.body.status.should.eql('success')
            res.body.data.should.include.keys(
              'id',
              'type',
              'url',
              'owner_id',
              'deleted_at',
              'created_at',
              'updated_at'
            )
            // ensure the document was in fact updated
            const newdocumentObject = res.body.data
            newdocumentObject.type.should.eql(documentObject.type)
            done()
          })
      })
  })
})
