
const Sequelize = require('sequelize')
const db = require('../db')

const Votecycle = db.define('votecycle', {
  active: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Votecycle