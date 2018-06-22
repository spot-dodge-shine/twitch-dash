const Sequelize = require('sequelize')
const db = require('../db')

const Votechoice = db.define('votechoice', {
  votecycleEnumId: {
    type: Sequelize.INTEGER
  }
})

module.exports.Votechoice = Votechoice