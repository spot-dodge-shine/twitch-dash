'use strict'

const router = require('express').Router()
const axios = require('axios')
const { User } = require('../db/models')
const { checkSpotifyAccessToken, refreshSpotifyAccessToken } = require('./spotify-refresh')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/me/token', refreshSpotifyAccessToken)

router.get('/me/playlists', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.get(process.env.SPOTIFY_API_URL + '/v1/me/playlists', {
      headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
    })
    res.json(data)
  } catch (err) {
    console.log('Error when getting playlists')
    next(err)
  }
})

router.get('/me/playlists/:playlistId/tracks/:offset', checkSpotifyAccessToken,
  async (req, res, next) => {
    try {
      const { data } = await axios.get(process.env.SPOTIFY_API_URL +
        `/v1/users/${req.user.spotifyId}/playlists/${req.params.playlistId}/tracks?offset=${req.params.offset}`, {
          headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
        })
        res.json(data)
    } catch (err) {
      next(err)
    }
})

router.put('/me/playtrack/:trackURI', async (req, res, next) => {
  try {
    const { data } = await axios.put(process.env.SPOTIFY_API_URL + '/v1/me/player/play',
      { uris: [req.params.trackURI] },
      { headers: { Authorization: 'Bearer' + req.user.spotifyAccessToken } })
    res.json(data)
  } catch (err) {
    next(err)
  }
})
