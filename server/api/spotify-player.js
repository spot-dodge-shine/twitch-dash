'use strict'

const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const spotifyPlayerInfo = await axios.get('https://api.spotify.com/v1/me/player')
    res.json(spotifyPlayerInfo)
  } catch (err) {
    next(err)
  }
})
