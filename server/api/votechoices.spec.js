const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Votecycle = db.model('votecycle')

describe('Votechoices routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/votechoices', async () => {
    beforeEach(async () => {
      const votecycle1 = await Votecycle.create({ active: true })
    })

    it('POST /api/votechoices', async () => {
      const res = await request(app)
        .post('/api/votechoices')
        .send({votecycleId: 1})
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.votecycleId).to.be.equal(1)
    })

  })

})