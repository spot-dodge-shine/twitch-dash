
const Sequelize = require('sequelize')
const db = require('../db')

const Spotify = db.define('spotifyAccount', {
  spotifyEmail: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  spotifyHref: {
    type: Sequelize.STRING,
  },
  spotifyId: {
    type: Sequelize.STRING,
    unique: true
  },
  spotifyImg: {
    type: Sequelize.STRING,
  },
  spotifyPremium: {
    type: Sequelize.BOOLEAN,
  },
  spotifyAccessToken: {
    type: Sequelize.TEXT,
  },
  spotifyRefreshToken: {
    type: Sequelize.TEXT,
  },
  spotifyLastRefresh: {
    type: Sequelize.DATE,
  },
  spotifyAuthCode: {
    type: Sequelize.TEXT,
  },
  spotifyState: {
    type: Sequelize.STRING
  },
})

module.exports.Spotify = Spotify
