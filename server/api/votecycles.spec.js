/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Votecycle = db.model('votecycle')
const Votechoice = db.model('votechoice')
const Vote = db.model('vote')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/votecycles', async () => {
    beforeEach(async () => {
      const votecycle1 = await Votecycle.create({ active: true })
      const votechoice1 = await Votechoice.create({ votecycleId: votecycle1.id })
      const votechoice2 = await Votechoice.create({ votecycleId: votecycle1.id })
      const votechoice3 = await Votechoice.create({ votecycleId: votecycle1.id })
      const vote1 = await Vote.create({ votechoiceId: votechoice1.id })
      const vote2 = await Vote.create({ votechoiceId: votechoice2.id })
      const vote3 = await Vote.create({ votechoiceId: votechoice2.id })
      const vote4 = await Vote.create({ votechoiceId: votechoice2.id })
      const vote5 = await Vote.create({ votechoiceId: votechoice3.id })
      const vote6 = await Vote.create({ votechoiceId: votechoice3.id })

      const votecycle2 = await Votecycle.create({ active: false })

    })
    
    it('GET /api/votecycles', async () => {
      const res = await request(app)
        .get('/api/votecycles')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].active).to.be.equal(true)
    })

    it('POST /api/votecycles', async () => {
      const res = await request(app)
        .post('/api/votecycles')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.active).to.be.equal(true)
    })

    it('PUT /api/votecycles/:id', async () => {
      let res = await request(app)
        .get('/api/votecycles')

      expect(res.body[0].active).to.be.equal(true)

      res = await request(app)
        .put('/api/votecycles/1')
        .send({active: false})
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.active).to.be.equal(false)
    })

    it('GET /api/votecycles/:id/votes', async () => {
      let res = await request(app)
        .get('/api/votecycles/1/votes')

      expect(res.body).to.be.an('object')
      expect(Object.keys(res.body).length).to.be.equal(3)
      expect(res.body[1]).to.be.equal(1)
      expect(res.body[2]).to.be.equal(3)
      expect(res.body[3]).to.be.equal(2)

    })
  })

})