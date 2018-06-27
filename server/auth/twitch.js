const passport = require('passport')
const router = require('express').Router()
const TwitchStrategy = require('passport-twitch-new').Strategy
const {User} = require('../db/models')
const twitchBot = require('../bot')
module.exports = router

if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
  console.log('Twitch client ID / secret not found. Skipping Twitch OAuth.')
} else {
  const twitchConfig = {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/twitch/callback/`
  }

  const strategy = new TwitchStrategy(
    twitchConfig,
    async (accessToken, refreshToken, profile, done) => {

      const user = await User.findOne({where: {twitchId: profile.id}})
      if (user) {
        twitchBot()
        done(null, user)
      } else {
        const newUser = await User.create({
          twitchId: profile.id,
          twitchLogin: profile.login,
          twitchImg: profile.profile_image_url,
          twitchAccessToken: accessToken,
          isActiveDash: true
        })
        twitchBot()
        done(null, newUser)
      }
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
