const Sequelize = require('sequelize')
const db = require('../db')

const PayPal = db.define('payPalAccount', {
  payPalEmail: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  }
})

module.exports.PayPal = PayPal
