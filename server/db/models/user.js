const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  // email: {
  //   type: Sequelize.STRING
  //   // unique: true,
  //   // allowNull: false
  // },
  // password: {
  //   type: Sequelize.STRING,
  //   // Making `.password` act like a func hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('password')
  //   }
  // },
  // salt: {
  //   type: Sequelize.STRING,
  //   // Making `.salt` act like a function hides it when serializing to JSON.
  //   // This is a hack to get around Sequelize's lack of a "private" option.
  //   get() {
  //     return () => this.getDataValue('salt')
  //   }
  // },
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

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

// User.prototype.spotifyAccessToken = async function () {
//   const spotifyAcct = await this.getSpotifyAccount()
//   console.log(spotifyAcct.spotifyAccessToken)
//   return spotifyAcct.spotifyAccessToken
// }
