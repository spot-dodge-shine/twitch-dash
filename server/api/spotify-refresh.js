'use strict'

const { User } = require('../db/models')
const axios = require('axios')
const refresh = require('spotify-refresh')


const refreshSpotifyAccessToken = (req, res, next) => {
  let spotifyAccessToken
  let user
  refresh(req.user.spotifyRefreshToken,
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET,
    async (err, res, body) => {
      if (err) return
      spotifyAccessToken = body.access_token
      user = await User.findById(req.user.id)
      await user.update({ spotifyAccessToken, spotifyLastRefresh: Date.now() })
      req.user = user
    }
  )
  res.json(user)
}

const checkSpotifyAccessToken = (req, res, next) => {
  if (!req.user.spotifyLastRefresh || Date.now() - req.user.spotifyLastRefresh > 2400000) {
    refreshSpotifyAccessToken(req, res, next)
  }
  next()
}

module.exports = { checkSpotifyAccessToken, refreshSpotifyAccessToken }
