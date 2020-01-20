const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const uuidv4 = require('uuid/v4')
const server = require('../server')
const knex = require('../db/connection')
chai.use(chaiHttp)

describe('PATCH /', () => {
  it('should return the document that was updated', done => {
    knex('documents')
      .select('*')
      .then(document => {
        const documentObject = document[0]
        chai
          .request(server)
          .patch(`/${documentObject.id}`)
          .send({
            type: 'test_type'
          })
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
            // ensure the document was in fact updated
            const newdocumentObject = res.body.data[0]
            newdocumentObject.type.should.eql('test_type')
            done()
          })
      })
  })

  it('should throw an error if the document does not exist', done => {
    chai
      .request(server)
      .patch(`/${uuidv4()}`)
      .send({
        type: 'test_type'
      })
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
