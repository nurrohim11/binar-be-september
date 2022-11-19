const authController = require('../controllers/authController')
const homeController = require('../controllers/homeController')

const router = require('express').Router()

router.get('/register', authController.registerPage)
router.post('/register', authController.registerUser)
router.get('/login', authController.loginPage)
router.post('/login', authController.login)
router.get('/home', homeController.homePage)

module.exports = router