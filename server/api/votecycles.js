const router = require('express').Router()
const {Votecycle, Vote, Votechoice} = require('../db/models')
module.exports = router

// Get all votecycles
router.get('/', async (req, res, next) => {
  try {
    const votecycles = await Votecycle.findAll()
    res.json(votecycles)
  } catch (err) {
    next(err)
  }
})

// Get active votecycle for user
router.get('/active/:userId', async (req, res, next) => {
  try {
    const activeVotecycle = await Votecycle.findOne({
      where: {
        userId: req.params.userId,
        active: true
      },
      include: [{
        model: Votechoice,
      }]
    })
    res.json(activeVotecycle)
  } catch(err) {
    next(err)
  }
})

// Create new votecycle
router.post('/', async (req, res, next) => {
  try {
    const {userId, playlistId} = req.body
    const votecycle = await Votecycle.create({
      active: true,
      userId: userId,
      playlistId: playlistId
    })
    const retVotecycle = await Votecycle.findOne({
      where: {
        id: votecycle.id,
      },
      include: [{
        model: Votechoice,
      }]
    })
    res.json(retVotecycle)
  } catch(err) {
    next(err)
  }
})

// Update votecycle (used to deactivate)
router.put('/:id', async (req, res, next) => {
  try {
    const {active} = req.body
    const votecycle = await Votecycle.findById(req.params.id)
    const retVotecycle = await votecycle.update({active})
    res.json(retVotecycle)
  } catch(err) {
    next(err)
  }
})

// Get song votecount
router.get('/:id/votes', async (req, res, next) => {
  try {
    const votecycle = await Votecycle.findOne({
      where: {
        id: req.params.id,
        active: true
      },
      include: [{
        model: Votechoice, include: [{
          model: Vote
        }]
      }]
    })

    let dict = {}
    votecycle.votechoices.forEach(votechoice => {
      dict[votechoice.id] = votechoice.votes.length
    })
    res.json(dict)
  } catch(err) {
    next(err)
  }
})