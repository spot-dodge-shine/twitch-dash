'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Module = db.define('module', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports.Module = Module
