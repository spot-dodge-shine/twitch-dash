const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {
  selection: {
    type: Sequelize.INTEGER
  }
})

module.exports = Vote