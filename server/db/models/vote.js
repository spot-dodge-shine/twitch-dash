const Sequelize = require('sequelize')
const db = require('../db')

const Vote = db.define('vote', {})

module.exports = Vote