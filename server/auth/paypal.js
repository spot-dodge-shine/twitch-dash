const passport = require('passport')
const router = require('express').Router()
const PayPalStrategy = require('passport-paypal').Strategy
module.exports = router

if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
  console.log('PayPal client ID / secret not found. Skipping PayPal OAuth.')
} else {
  const payPalConfig = {
    mode: 'sandbox',
    clientID: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    callbackURL: process.env.PAYPAL_CALLBACK_URL
  }

  const strategy = new PayPalStrategy(
    payPalConfig,
  )

  passport.use(strategy)
}
