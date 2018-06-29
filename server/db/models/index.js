
const { User } = require('./user')
const { Spotify } = require('./spotify')
const { Votecycle } = require('./votecycle')
const { Votechoice } = require('./votechoice')
const { Vote } = require('./vote')
const { Module } = require('./module')
const { ModuleUser } = require('./module_user')
const { PayPal } = require('./paypal')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

  User.belongsToMany(Module, { through: ModuleUser })
  Module.belongsToMany(User, { through: ModuleUser })

  User.hasOne(Spotify)
  Spotify.belongsTo(User)

  User.hasMany(Votecycle)
  Votecycle.belongsTo(User)

  Votecycle.hasMany(Votechoice)
  Votechoice.belongsTo(Votecycle)

  Votechoice.hasMany(Vote)
  Vote.belongsTo(Votechoice)

  User.hasOne(PayPal)
  PayPal.belongTo(User)

  User.prototype.getActiveVotecycle = async function() {
    const votecycles = await this.getVotecycles()
    return votecycles.filter(votecycle => {
      return votecycle.active
    })[0]
  }

  User.prototype.getAllModules = async function () {
    const modules = await this.getModules()
    const statusLoaded = await Promise.all(
      modules.map(module => ModuleUser.findOne({
        where: { moduleId: module.id }
      })))
    const resultObj = statusLoaded.reduce((obj, module) => {
      if (module.enabled === true) {
        obj.active.push(module.moduleId)
      } else {
        obj.deactivated.push(module.moduleId)
      }
      return obj
    }, {
      active: [],
      deactivated: []
    })
    return resultObj
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

module.exports = {
  User,
  Spotify,
  Votecycle,
  Vote,
  Votechoice,
  Module,
  ModuleUser,
  PayPal
}
