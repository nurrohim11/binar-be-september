const router = require('express').Router()
const authController = require('./controllers/authController')
const homeController = require('./controllers/homeController')
const auth = require('./middlewares/auth')

// router.get('/register', authController.registerPage)
router.post('/register', authController.registerUser)
// router.get('/login', authController.loginPage)
router.post('/login', authController.loginUser)
router.post('/refresh-token', authController.refreshToken)
router.get('/home', auth, homeController.home)

module.exports = router