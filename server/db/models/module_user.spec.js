'use strict'

const { expect } = require('chai')
const db = require('../db')
const User = db.model('user')
const Module = db.model('module')
const ModuleUser = db.model('module_user')

describe('ModuleUser model', () => {
  let moduleRelationship

  const fakeUser = {
    twitchId: '232629454',
    twitchLogin: 'itsericguo',
    twitchImg: 'https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-300x300.jpg',
    twitchAccessToken: 'totallyreal',
    isActiveDash: true
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

  describe('definition', () => {
    beforeEach(() => {
      return User.create(fakeUser)
        .then(() => {
          return Module.create(fakeModule)
        })
        .then(() => {
          return ModuleUser.create(moduleUser)
        })
        .then(async () => {
          moduleRelationship = await ModuleUser.find({ where: { userId: 1 } })
        })
    })

    it('contains an enabled column', () => {
      expect(moduleRelationship.enabled).to.be.equal(true)
    })
    it('contains an userId column', () => {
      expect(moduleRelationship.userId).to.be.equal(1)
    })
    it('contains a moduleId column', () => {
      expect(moduleRelationship.moduleId).to.be.equal(1)
    })
  })
})
