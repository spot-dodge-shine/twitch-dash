'use strict'

const router = require('express').Router()
const axios = require('axios')
const qs = require('qs')
const { Paypal } = require('../db/models')

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
  
      const {data} = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', qs.stringify({'grant_type': 'client_credentials'}), config)
      const paypalAccount = await Paypal.findOne({ where: { userId: req.user.id } })
      console.log('found account>>>>', paypalAccount)
      let retPaypal
      if (paypalAccount) {
        retPaypal = paypalAccount
        req.user.paypalAccessToken = data.access_token
      } else {
        const userInfo = await axios.get('https://api.sandbox.paypal.com/v1/oauth2/token/userinfo?schema=openid', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.access_token
          }
        })
        const newAccount = await Paypal.create({
          paypalId: userInfo.data.user_id,
          paypalAccessToken: data.access_token,
          expiresIn: data.expires_in,
          paypalLastRefresh: Date.now(),
          userId: req.user.id
        })
        req.user.paypalAccessToken = data.access_token
        retPaypal = newAccount
      }
      console.log('rePaypal', retPaypal)
      res.redirect('/home')
    } catch (err) {
      console.error(err)
    }
  })

  // router.get('/callback', passport.authenticate('paypal-token', { failureRedirect: '/' }),
  //   async (req, res, next) => {
  //     try {
  //       console.log('req.query>>>>>>>>>>>>>>', req.query)
  //       const { code, state } = req.query
  //       // const spotifyAcct = await Spotify.findOne({ where: { userId: req.user.id }})
  //       // await spotifyAcct.update({ spotifyAuthCode: code, spotifyState: state })
  //       res.redirect('/home')
  //     } catch (err) {
  //       next(err)
  //     }
  //   }
  // )
}
