'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Module = db.define('module', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports.Module = Module
