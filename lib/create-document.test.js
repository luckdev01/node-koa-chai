const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
chai.use(chaiHttp)

const sinon = require('sinon')
const endpoints = require('../api/documents')

describe('POST /', () => {
  const sandbox = sinon.createSandbox()

  before(async () => {
    sandbox.stub(endpoints, 'create')
  })

  afterEach(() => sandbox.reset())
  after(() => {
    sandbox.restore()
  })

  it('should return the document that was added', done => {
    chai
      .request(server)
      .post('/')
      .send({
        type: 'movie',
        url: 'https://test.movie.com/8',
        owner_id: 'test_owner_id'
      })
      .end((err, res) => {
        should.not.exist(err)
        res.status.should.equal(201)
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
        done()
      })
  })
})
