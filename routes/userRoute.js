
const { register, verifyAccount, resendVerification, signIn, requireUser, getUserDetails } = require('../controllers/userController');

const router = require('express').Router();

router.post('/register',register)
router.get('/verifyuser/:token',verifyAccount)
router.post('/resendVerify',resendVerification)
router.post('/login',signIn)
router.get('/profile/:id',requireUser,getUserDetails)

module.exports = router

