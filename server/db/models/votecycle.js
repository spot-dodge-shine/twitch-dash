
const Sequelize = require('sequelize')
const db = require('../db')

const Votecycle = db.define('votecycle', {
  songId1: {
    type: Sequelize.STRING
  },
  songId2: {
    type: Sequelize.STRING
  },
  songId3: {
    type: Sequelize.STRING
  },
  songId4: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN
  }
})

module.exports.Votecycle = Votecycle
