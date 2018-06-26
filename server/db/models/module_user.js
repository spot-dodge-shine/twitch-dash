'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const ModuleUser = db.define('module_user', {
  enabled: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports.ModuleUser = ModuleUser
