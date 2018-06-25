'use strict'

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')
const Module = db.model('module')

describe('Module model', () => {
  describe('definition', () => {
    let module

    const fakeUser = {
      twitchId: '232629454',
      twitchLogin: 'itsericguo',
      twitchImg: 'https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-300x300.jpg',
      twitchAccessToken: 'totallyreal',
      isActiveDash: true
    }

    const fakeModule = {
      name: 'spotify-muscicvote',
      enabled: true,
      userId: 1
    }

    beforeEach(() => {
      return User.create(fakeUser)
        .then(() => {
          return Module.create(fakeModule)
        })
        .then(async () => {
          module = await Module.findOne({ where: { id: 1 } })
        })
    })
    it('contains a name column', () => {
      expect(module.name).to.be.equal(fakeModule.name)
    })
    it('contains a enabled column', () => {
      expect(module.enabled).to.be.equal(fakeModule.enabled)
    })
    it('contains a userId column', () => {
      expect(module.userId).to.be.equal(fakeModule.userId)
    })
  })
})
