'use strict'

const passport = require('passport')
const router = require('express').Router()
const SpotifyStrategy = require('passport-spotify').Strategy
const { User } = require('../db/models')

let userId

module.exports = router

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.')
} else {

  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/spotify/callback`
  }

  const strategy = new SpotifyStrategy(spotifyConfig, async (accessToken, refreshToken, profile, done) => {
    const foundUser = await User.findOne({ where: { id: userId } })
    const user = await foundUser.update({
      spotifyEmail: profile._json.email,
      spotifyHref: profile.href,
      spotifyId: profile.id,
      spotifyImg: profile.photos[0],
      spotifyPremium: (profile.product === 'premium'),
      spotifyAccessToken: accessToken,
      spotifyRefreshToken: refreshToken,
    })
    done(null, user)
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
      'playlist-read-private',
      'playlist-read-collaborative',
      'user-modify-playback-state',
      'streaming'
    ]
  }))

  router.get('/callback', passport.authenticate('spotify', { failureRedirect: '/' }),
    async (req, res) => {
      const { code, state } = req.query
      const user = await User.findById(req.user.id)
      req.user = await user.update({ spotifyAuthCode: code, spotifyState: state })
      res.redirect('/')
    }
  )
}
