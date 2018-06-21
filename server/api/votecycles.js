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

// Create new votecycle
router.post('/', async (req, res, next) => {
  try {
    const votecycle = await Votecycle.create({
      active: true
    })
    res.json(votecycle)
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

// Get song winner
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