'use strict'

const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const { Spotify } = require('../db/models')

module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {

  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/spotify/callback`,
    passReqToCallback: true
  }

  const strategy = new SpotifyStrategy(spotifyConfig,
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const spotifyAcct = await Spotify.findOne({ where: { userId: req.user.id } })
        if (spotifyAcct) {
          req.user.spotifyId = profile.id
          req.user.spotifyAccessToken = accessToken
          done(null, req.user)
        } else {
          await Spotify.create({
            spotifyEmail: profile._json.email,
            spotifyHref: profile.href,
            spotifyId: profile.id,
            spotifyImg: profile.photos[0],
            spotifyPremium: (profile.product === 'premium'),
            spotifyAccessToken: accessToken,
            spotifyRefreshToken: refreshToken,
            userId: req.user.id
          })
          req.user.spotifyId = profile.id
          req.user.spotifyAccessToken = accessToken
          done(null, req.user)
        }
      } catch (err) {
        console.error(err)
      }
  })

  passport.use(strategy)

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

  router.get('/', passport.authenticate('spotify', {
    scope: [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-modify-playback-state',
      'streaming'
    ]
  }))

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/' }),
    async (req, res, next) => {
      try {
        const { code, state } = req.query
        const spotifyAcct = await Spotify.findOne({ where: { userId: req.user.id }})
        await spotifyAcct.update({ spotifyAuthCode: code, spotifyState: state })
        res.redirect('/home')
      } catch (err) {
        next(err)
      }
    }
  )
}
