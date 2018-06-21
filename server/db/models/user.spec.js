/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Spotify = db.model('spotifyAccount')

describe('User model', () => {
  describe('getterMethods', () => {
    describe('spotifyAccessToken', () => {
      let user

      beforeEach(async () => {
        user = await User.create({
          twitchId: '232629454',
          twitchLogin: 'itsericguo',
          twitchImg: 'https://static-cdn.jtvnw.net/user-default-pictures/27103734-3cda-44d6-a384-f2ab71e4bb85-profile_image-300x300.jpg',
          twitchAccessToken: 'totallyreal',
          isActiveDash: true
        })

        await Spotify.create({
          spotifyEmail: 'erkinator@gmail.com',
          spotifyHref: null,
          spotifyId: 'itsericguo',
          spotifyImg: null,
          spotifyPremium: false,
          spotifyAccessToken: 'fakestringlikethis',
          spotifyRefreshToken: 'fakestringlikethat',
          userId: '1'
        })
      })

    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
