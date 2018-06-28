'use strict'

const router = require('express').Router()
const axios = require('axios')
const { User, ModuleUser } = require('../db/models')
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

router.get('/me/player', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.get(process.env.SPOTIFY_API_URL + '/v1/me/player',
    {
      headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
    })
    let response = {
      isPlaying: data.is_playing,
      progress: data.progress_ms,
      currentlyPlaying: {
        name: data.item.name,
        artist: data.item.artists[0].name,
        id: data.item.id
      }
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.put('/me/player/pause', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.put(process.env.SPOTIFY_API_URL + '/v1/me/player/pause', {},
    {
      headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/me/player/resume', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.put(process.env.SPOTIFY_API_URL + '/v1/me/player/play', {},
    {
      headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.put('/me/player/next', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.post(process.env.SPOTIFY_API_URL + '/v1/me/player/next', {},
    {
      headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken}
    })
    res.json(data)
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
    const playlists = data.items.map(playlist => {
      return {
        name: playlist.name,
        id: playlist.id,
        image: playlist.images.length ? playlist.images[0].url : null,
        externalUrl: playlist.external_urls.spotify,
        uri: playlist.uri,
        trackCount: playlist.tracks.total
      }
    }).reduce((resultObj, playlist) => {
      resultObj[playlist.id] = playlist
      return resultObj
    }, {})
    res.json(playlists)
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
      const tracks = data.items.map(item => {
        return {
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          image: item.track.album.images.length > 1 ?
            item.track.album.images[1].url : null,
          id: item.track.id,
          uri: item.track.uri
        }
      }).reduce((resultObj, track) => {
        resultObj[track.id] = track
        return resultObj
      }, {})
      res.json(tracks)
    } catch (err) {
      next(err)
    }
})

router.put('/me/playtrack/:trackURI', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.put(process.env.SPOTIFY_API_URL + '/v1/me/player/play',
      { uris: [req.params.trackURI] },
      { headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken } })
    res.json(data.id)
  } catch (err) {
    next(err)
  }
})

router.get('/me/devices/', checkSpotifyAccessToken, async (req, res, next) => {
  try {
    const { data } = await axios.get(process.env.SPOTIFY_API_URL + '/v1/me/player/devices',
      { headers: { Authorization: 'Bearer ' + req.user.spotifyAccessToken } })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/active', async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        isActiveDash: true
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/username/:username/:enum', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        twitchLogin: req.params.username
      }
    })
    const votecycle = await user.getActiveVotecycle()
    const votechoices = await votecycle.getVotechoices()
    const votechoice = votechoices.filter(choice => {
      return choice.votecycleEnumId === parseInt(req.params.enum, 10)
    })[0]
    res.json(votechoice)
  } catch(err) {
    next(err)
  }
})

router.get('/me/modules', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { twitchId: req.user.twitchId } })
    const modules = await user.getAllModules()
    res.json(modules)
  } catch (err) {
    next(err)
  }
})

router.post('/me/modules', async (req, res, next) => {
  const { moduleId } = req.body
  try {
    const user = await User.findOne({ where: { twitchId: req.user.twitchId } })
    await ModuleUser.create({
      moduleId: moduleId,
      userId: user.id,
      enabled: true
    })
    res.json(await user.getAllModules())
  } catch (err) {
    next(err)
  }
})

router.put('/me/modules', async (req, res, next) => {
  const { moduleId } = req.body
  try {
    const user = await User.findOne({ where: { twitchId: req.user.twitchId } })
    const moduleUserRelationship = await ModuleUser.findOne({
      where: {
        userId: user.id,
        moduleId
      }
    })
    await moduleUserRelationship.update({
      enabled: !moduleUserRelationship.enabled
    })
    res.json(await user.getAllModules())
  } catch (err) {
    next(err)
  }
})
