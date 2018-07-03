const Sequelize = require('sequelize')
const db = require('../db')

const Paypal = db.define('paypalAccount', {
  paypalId: {
    type: Sequelize.STRING
  },
  paypalAccessToken: {
    type: Sequelize.STRING
  },
  paypalRefreshToken: {
    type: Sequelize.STRING,
  },
  paypalLastRefresh: {
    type: Sequelize.DATE
  },
  paypalAuthCode: {
    type: Sequelize.STRING
  }
})

module.exports.Paypal = Paypal
