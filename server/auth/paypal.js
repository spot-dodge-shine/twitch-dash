'use strict'

const router = require('express').Router()
const axios = require('axios')
const qs = require('qs')
const { Paypal } = require('../db/models')

module.exports = router

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  console.log('Paypal client ID / secret not found. Skipping Paypal OAuth.')
} else {

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

  router.get('/', async (req, res, next) => {
    try {
      const {data} = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token',
                  qs.stringify({'grant_type': 'client_credentials'}),
                  {
                    headers: {
                      Accept: 'application/json',
                      'Accept-Language': 'en_US'
                    },
                    auth: {
                      username: process.env.PAYPAL_CLIENT_ID,
                      password: process.env.PAYPAL_CLIENT_SECRET
                    }
                  })
      req.user.paypalAccessToken = data.access_token
      req.user.paypalExpires = Date.now() + (1000 * data.expires_in)
      res.redirect(`https://www.sandbox.paypal.com/webapps/auth/protocol/openidconnect/v1/authorize?response_type=code&client_id=${process.env.PAYPAL_CLIENT_ID}&scope=openid+https://uri.paypal.com/services/invoicing&redirect_uri=${process.env.PAYPAL_CALLBACK_URL}`)
    } catch (err) {
      console.error(err)
    }
  })

  router.get('/callback', async (req, res, next) => {
    try {
      const {code} = req.query
      const {data} = await axios.post('https://api.sandbox.paypal.com/v1/identity/openidconnect/tokenservice', 
                                qs.stringify({'grant_type': 'authorization_code', 'code': code}),
                                {auth: {username: process.env.PAYPAL_CLIENT_ID, password: process.env.PAYPAL_CLIENT_SECRET}})
      
      let paypalAccount = await Paypal.findOne({ where: { userId: req.user.id } })
      if (paypalAccount) {
        await paypalAccount.update({expiresIn: data.expires_in})
        req.user.paypalUserAccessToken = data.access_token
      } else {
        const userInfo = await axios.get('https://api.sandbox.paypal.com/v1/oauth2/token/userinfo?schema=openid', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + data.access_token
          }
        })
        paypalAccount = await Paypal.create({
          paypalId: userInfo.data.user_id,
          paypalAccessToken: req.user.paypalAccessToken,
          paypalRefreshToken: data.refresh_token,
          paypalLastRefresh: Date.now(),
          userId: req.user.id
        })
        req.user.paypalUserAccessToken = data.access_token
      }
      await paypalAccount.update({ paypalAuthCode: code})
      req.user.paypalAuthcode = code
      res.redirect('/home')
    } catch (err) {
      next(err)
    }
  })
}
