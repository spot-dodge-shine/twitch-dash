
const { User } = require('./user')
const { Spotify } = require('./spotify')
const { Votecycle } = require('./votecycle')
const { Votechoice } = require('./votechoice')
const { Vote } = require('./vote')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 User.hasOne(Spotify)
 Spotify.belongsTo(User)

 User.hasMany(Votecycle)
 Votecycle.belongsTo(User)

 Votecycle.hasMany(Votechoice)
 Votechoice.belongsTo(Votecycle)

 Votechoice.hasMany(Vote)
 Vote.belongsTo(Votechoice)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Spotify,
  Votecycle,
  Vote,
  Votechoice
}
