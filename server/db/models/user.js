const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {

  twitchLogin: {
    type: Sequelize.STRING,
    unique: true,
  },
  twitchId: {
    type: Sequelize.STRING,
    unique: true,
  },
  twitchImg: {
    type: Sequelize.STRING
  },
  twitchAuthCode: {
    type: Sequelize.TEXT,
  },
  twitchAccessToken: {
    type: Sequelize.TEXT,
  },
  isActiveDash: {
    type: Sequelize.BOOLEAN
  }
})

module.exports.User = User

// User.prototype.spotifyAccessToken = async function () {
//   const spotifyAcct = await this.getSpotifyAccount()
//   console.log(spotifyAcct.spotifyAccessToken)
//   return spotifyAcct.spotifyAccessToken
// }
