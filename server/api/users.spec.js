/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

// console.log(db)

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/active', async () => {
    beforeEach(async () => {
      await User.create({
        twitchId: 'testUser1',
        isActiveDash: true
      })

      await User.create({
        twitchId: 'testUser2',
        isActiveDash: false
      })
    })
    
    it('GET /api/users/active', async () => {
      const res = await request(app)
        .get('/api/users/active')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].twitchId).to.be.equal('testUser1')
    })
  })

}) // end describe('User routes')
