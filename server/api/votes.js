const router = require('express').Router()
const {Vote} = require('../db/models')
module.exports = router

// Create new votechoice
router.post('/', async (req, res, next) => {
  try {
    const { votechoiceId } = req.body
    const vote = await Vote.create({votechoiceId})
    res.json(vote)
  } catch (err) {
    next(err)
  }
})