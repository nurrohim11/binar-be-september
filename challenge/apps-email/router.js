const router = require('express').Router()
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')
const auth = require('./middlewares/auth')

router.post('/auth/login-admin', authController.loginAdmin)
router.post('/user/invite', auth ,userController.inviteUserWithoutButton)
router.post('/user/invite-with-verify', auth ,userController.inviteUserWithButtonVerify)
router.get('/user/verifikasi/:token', userController.verificationEmailWithVerify)

module.exports = router