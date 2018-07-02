// 'use strict'

// const { Paypal } = require('../db/models')

// const refreshSpotifyAccessToken = (req, res, next, spotifyAcct) => {
//   let spotifyAccessToken
//   refresh(spotifyAcct.spotifyRefreshToken,
//     process.env.SPOTIFY_CLIENT_ID,
//     process.env.SPOTIFY_CLIENT_SECRET,
//     async (err, refreshRes, body) => {
//       if (err) return
//       spotifyAccessToken = body.access_token
//       await spotifyAcct.update({ spotifyAccessToken, spotifyLastRefresh: Date.now() })
//       req.user.spotifyAccessToken = spotifyAccessToken
//       console.log('refreshing token!')
//       next()
//     }
//   )
// }

// const checkSpotifyAccessToken = async (req, res, next) => {
//   const spotifyAcct = await Spotify.findOne({ where: { userId: req.user.id } })
//   if (spotifyAcct &&
//     (!spotifyAcct.spotifyLastRefresh ||
//       Date.now() - spotifyAcct.spotifyLastRefresh > 2400000)) {
//         refreshSpotifyAccessToken(req, res, next, spotifyAcct)
//   } else {
//     next()
//   }
// }

// module.exports = { checkSpotifyAccessToken, refreshSpotifyAccessToken }
