const passport = require('passport')
const router = require('express').Router()
const TwitchStrategy = require('passport-twitch-new').Strategy
const {User} = require('../db/models')
module.exports = router

if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
  console.log('Twitch client ID / secret not found. Skipping Twitch OAuth.')
} else {
  const twitchConfig = {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/twitch/callback/`
  }

  //Remember to change this back to global var^


  const strategy = new TwitchStrategy(
    twitchConfig,
    async (accessToken, refreshToken, profile, done) => {

      const users = await User.findOrCreate({where: {twitchId: profile.id}, defaults: {
        twitchId: profile.id,
        twitchLogin: profile.login,
        twitchImg: profile.profile_image_url,
        twitchAccessToken: accessToken
      }})
      user = users[0]
      done(null, user)
    }
  )

  passport.use(strategy)

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

  router.get('/', passport.authenticate('twitch', {scope: ['chat_login']}))

  router.get('/callback', passport.authenticate('twitch', { failureRedirect: '/login' }),
    async (req, res, next) => {
      const {code} = req.query
      const user = await User.findById(req.user.id)
      req.user = await user.update({twitchAuthCode: code})
      res.redirect('/home')
  })
}
