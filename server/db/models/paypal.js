const Sequelize = require('sequelize')
const db = require('../db')

const Paypal = db.define('paypalAccount', {
  paypalId: {
    type: Sequelize.STRING
  },
  paypalAccessToken: {
    type: Sequelize.STRING
  },
  expiresIn: {
    type: Sequelize.INTEGER
  },
  paypalLastRefresh: {
    type: Sequelize.DATE
  }
})

module.exports.Paypal = Paypal
