'use strict'

const router = require('express').Router()
const axios = require('axios')
const { Module } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  const modules = await Module.findAll()
  res.json(modules)
})
