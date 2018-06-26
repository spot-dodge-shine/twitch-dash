const router = require('express').Router()
const {Votechoice} = require('../db/models')
const { refreshSpotifyAccessToken } = require('./spotify-refresh')
const axios = require('axios')
module.exports = router

// Create new votechoice
router.post('/', async (req, res, next) => {
  try {
    const { votecycleId, votecycleEnumId, trackId } = req.body
    const votechoice = await Votechoice.create({votecycleId, votecycleEnumId, trackId})
    res.json(votechoice)
  } catch (err) {
    next(err)
  }
})

router.get('/:trackId', refreshSpotifyAccessToken, async (req, res, next) => {
  try {
    const {data} = await axios.get(process.env.SPOTIFY_API_URL + `/v1/tracks/${req.params.trackId}`, {
      headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
    })
    const track = {
      name: data.name,
      artist: data.artists[0].name,
      album: data.album.name,
      image: data.album.images.length > 1 ?
        data.album.images[1].url : null,
      id: data.id,
      uri: data.uri
    }
    res.json(track)
  } catch(err) {
    next(err)
  }
})