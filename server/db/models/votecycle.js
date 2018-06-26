
const Sequelize = require('sequelize')
const db = require('../db')

const Votecycle = db.define('votecycle', {
  active: {
    type: Sequelize.BOOLEAN
  },
  playlistId: {
    type: Sequelize.STRING
  }
})

module.exports.Votecycle = Votecycle
