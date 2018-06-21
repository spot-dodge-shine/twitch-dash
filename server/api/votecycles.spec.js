const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Votecycle = db.model('votecycle')
const Votechoice = db.model('votechoice')
const Vote = db.model('vote')

describe('Votecycle routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/votecycles', async () => {
    beforeEach(async () => {
      const user1 = await User.create({
        twitchId: 'testUser1',
        isActiveDash: true
      })
      const votecycle1 = await Votecycle.create({ active: true, userId: user1.id })

      await Promise.all([
        Votechoice.create({ votecycleId: votecycle1.id }),
        Votechoice.create({ votecycleId: votecycle1.id }),
        Votechoice.create({ votecycleId: votecycle1.id }),
      ])

      await Promise.all([
        Vote.create({ votechoiceId: 1 }),
        Vote.create({ votechoiceId: 2 }),
        Vote.create({ votechoiceId: 2 }),
        Vote.create({ votechoiceId: 2 }),
        Vote.create({ votechoiceId: 3 }),
        Vote.create({ votechoiceId: 3 }),
      ])

      const votecycle2 = await Votecycle.create({ active: false, userId: 1 })

    })
    
    it('GET /api/votecycles', async () => {
      const res = await request(app)
        .get('/api/votecycles')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].active).to.be.equal(true)
    })

    it('GET /api/votecycles/active/:userId', async () => {
      const res = await request(app)
        .get(`/api/votecycles/active/1`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.userId).to.be.equal(1)
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