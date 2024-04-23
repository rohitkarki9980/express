const express = require('express');
const {testFunction,testFunction2} = require('../controllers/testController');
const router = express.Router();

router.get('/test',testFunction)
router.get('/test2',testFunction2)

module.exports = router;