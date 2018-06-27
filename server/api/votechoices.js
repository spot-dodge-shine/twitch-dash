const router = require('express').Router()
const {Votechoice, User, Spotify} = require('../db/models')
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

router.get('/:trackId/:userId', refreshSpotifyAccessToken, async (req, res, next) => {
  try {
    let accessToken
    if(req.user && req.user.id) {
      accessToken = req.user.spotifyAccessToken
    } else {
      const user = await User.findOne({
        where: {
          id: req.params.userId
        }, 
        include: [{
          model: Spotify
        }]
      })
      accessToken = user.spotifyAccount.spotifyAccessToken
    }
    const {data} = await axios.get(process.env.SPOTIFY_API_URL + `/v1/tracks/${req.params.trackId}`, {
      headers: { Authorization: 'Bearer ' + accessToken}
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