'use strict'

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Module = db.model('module')
const ModuleUser = db.model('module_user')

xdescribe('Modules routes', () => {
  let user

  const fakeUser = {
    twitchId: '232629454',
    twitchLogin: 'itsericguo',
    twitchImg: 'https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-300x300.jpg',
    twitchAccessToken: 'totallyreal',
    isActiveDash: true,
    id: 1
  }

  const fakeModule = {
    name: 'spotify-muscicvote',
    description: 'Something written here as a description',
    image: 'https://fakeurl.com/totally-fake'
  }

  const moduleUser = {
    enabled: true,
    userId: 1,
    moduleId: 1
  }

  describe('/api/users/me/modules', () => {
    user = request.agent(app)

    beforeEach(() => {
      return User.create(fakeUser)
        .then(() => {
          return Module.create(fakeModule)
        })
        .then(() => {
          return ModuleUser.create(moduleUser)
        })
    })

    beforeEach(done => {
      user
        .post('/auth/twitch')
        .send(fakeUser)
        .end((err, res) => {
          if (err) throw err
          expect(res.statusCode).to.be.equal(200)
          done()
        })
    })

    xdescribe('GET /api/users/me/modules', () => {
      it('returns an array of active module ids for the user', async () => {
        const res = await request(app)
          .get('/api/users/me/modules')
          .expect(200)
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.be.equal(1)
        expect(res.body[0]).to.be.equal(1)
      })
    })
  })
})
