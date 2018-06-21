const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Votecycle = db.model('votecycle')
const Votechoice = db.model('votechoice')

describe('Votes routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/votes', async () => {
    beforeEach(async () => {
      const votecycle1 = await Votecycle.create({ active: true })
      const votechoice1 = await Votechoice.create({ votecycleId: votecycle1.id })
      const votechoice2 = await Votechoice.create({ votecycleId: votecycle1.id })
      const votechoice3 = await Votechoice.create({ votecycleId: votecycle1.id })
    })

    it('POST /api/votes', async () => {
      const res = await request(app)
        .post('/api/votes')
        .send({votechoiceId: 2})
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.votechoiceId).to.be.equal(2)
    })

  })

})