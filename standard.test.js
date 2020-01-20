'use strict'
const server = require('./server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
chai.use(chaiHttp)

describe('JavaScript codebase', () => {
  it(
    'conforms to javascript standard style (http://standardjs.com)',
    require('mocha-standard')
  ).timeout(10000)
})

describe('routes : index', () => {
  describe('GET /', () => {
    it('should return json', done => {
      chai
        .request(server)
        .get('/')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.eql(200)
          res.type.should.eql('application/json')
          res.body.status.should.equal('success')
          res.body.message.should.eql('hello, world!')
          done()
        })
    })
  })
})
