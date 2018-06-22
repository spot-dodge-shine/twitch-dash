
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

  User.prototype.getActiveVotecycle = async function() {
    const votecycles = await this.getVotecycles()
    return votecycles.filter(votecycle => {
      return votecycle.active
    })[0]
  }

  // Votechoice.findByUsername = async function(username, votecycleEnumId) {
  //   const ret = await this.findOne({
  //     where: {
  //       votecycleEnumId: votecycleEnumId
  //     },
  //     include: [{
  //       model: 'votecycle',
  //       where: {
  //         active: true
  //       },
  //       include: [{
  //         model: 'user',
  //         where: {
  //           twitchLogin: username
  //         }
  //       }]
  //     }]
  //   })
  //   return ret
  // }

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
