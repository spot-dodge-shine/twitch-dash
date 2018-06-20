'use strict'

const { Spotify } = require('../db/models')
const refresh = require('spotify-refresh')

const refreshSpotifyAccessToken = (spotifyAcct, res, next) => {
  let spotifyAccessToken
  refresh(spotifyAcct.spotifyRefreshToken,
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET,
    async (err, res, body) => {
      if (err) return
      spotifyAccessToken = body.access_token
      await spotifyAcct.update({ spotifyAccessToken, spotifyLastRefresh: Date.now() })
    }
  )
  res.json(spotifyAcct)
}

const checkSpotifyAccessToken = (req, res, next) => {
  const spotifyAcct = Spotify.findOne({ where: { userId: req.user.id } })
  if (!spotifyAcct.spotifyLastRefresh || Date.now() - spotifyAcct.spotifyLastRefresh > 2400000) {
    refreshSpotifyAccessToken(spotifyAcct, res, next)
  }
  next()
}

module.exports = { checkSpotifyAccessToken, refreshSpotifyAccessToken }
