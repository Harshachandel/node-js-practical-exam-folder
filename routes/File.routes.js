const { signup, login, getProfile, removeCookie, sendOtp, verifyOtp, checkAuth, verifyOtpMatch } = require('../controller/File.controller');
const { verifyUser } = require('../middleware/verify');

const router = require('express').Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/check-auth',verifyUser,checkAuth)
router.get('/getProfile',verifyUser,getProfile)
// router.post('/logout',verifyUser,removeCookie)
router.post('/sendOtp',sendOtp)
router.post('/verifyOtp',verifyOtp)
// router.post('/verifyOtpMatch',verifyOtpMatch)

module.exports = router;
