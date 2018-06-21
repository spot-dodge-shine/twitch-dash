const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/votecycles', require('./votecycles'))
router.use('/votechoices', require('./votechoices'))
router.use('/votes', require('./votes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
