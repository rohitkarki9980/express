const { createPlaces } = require('../controllers/placesController')

const router = require('express').Router()

router.post('/createPlace',createPlaces)

module.exports = router
