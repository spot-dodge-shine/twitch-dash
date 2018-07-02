'use strict'

const passport = require('passport')
const router = require('express').Router()
const PaypalStrategy = require('passport-paypal-token')
const axios = require('axios')
const qs = require('qs')

module.exports = router

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  console.log('Paypal client ID / secret not found. Skipping Paypal OAuth.')
} else {

  const paypalConfig = {
    clientID: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    callbackURL: process.env.PAYPAL_CALLBACK_URL,
    passReqToCallback: true
  }

  // const strategy = new PaypalStrategy(paypalConfig,
  //   async (req, accessToken, refreshToken, profile, done) => {
  //     try {
  //       console.log('profile>>>>>>>>>>>>>>>', profile)
  //       // const spotifyAcct = await Spotify.findOne({ where: { userId: req.user.id } })
  //       // if (spotifyAcct) {
  //       //   req.user.spotifyId = profile.id
  //       //   req.user.spotifyAccessToken = accessToken
  //       //   done(null, req.user)
  //       // } else {
  //       //   await Spotify.create({
  //       //     spotifyEmail: profile._json.email,
  //       //     spotifyHref: profile.href,
  //       //     spotifyId: profile.id,
  //       //     spotifyImg: profile.photos[0],
  //       //     spotifyPremium: (profile.product === 'premium'),
  //       //     spotifyAccessToken: accessToken,
  //       //     spotifyRefreshToken: refreshToken,
  //       //     userId: req.user.id
  //       //   })
  //       //   req.user.spotifyId = profile.id
  //       //   req.user.spotifyAccessToken = accessToken
  //       //   done(null, req.user)
  //       // }
  //       done(null, req.user)
  //     } catch (err) {
  //       console.log('hebroke')
  //       console.error(err)
  //     }
  // })

  // passport.use(strategy)

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

  router.get('/', async (req, res, next) => {
    try {
      const config = {
        auth: {
          username: process.env.PAYPAL_CLIENT_ID,
          password: process.env.PAYPAL_CLIENT_SECRET
        },
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
  
      const myRes = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', qs.stringify({'grant_type': 'client_credentials'}), config)
      res.json(myRes.data)
    }catch (err) {
      console.error(err)
    }
  })

  router.get('/callback', passport.authenticate('paypal-token', { failureRedirect: '/' }),
    async (req, res, next) => {
      try {
        console.log('req.query>>>>>>>>>>>>>>', req.query)
        const { code, state } = req.query
        // const spotifyAcct = await Spotify.findOne({ where: { userId: req.user.id }})
        // await spotifyAcct.update({ spotifyAuthCode: code, spotifyState: state })
        res.redirect('/home')
      } catch (err) {
        next(err)
      }
    }
  )
}
