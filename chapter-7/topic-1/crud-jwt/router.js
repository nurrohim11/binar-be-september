const router = require('express').Router()
const passport = require('./lib/passport')
const authController = require('./controllers/authController')
// const homeController = require('./controllers/homeController')
const productController = require('./controllers/productController')
const auth = require('./middlewares/auth')

router.get('/auth', passport.authenticate('google', {scope:['email','profile']}))
router.get('/callback', passport.authenticate('google',{successRedirect:'https://google.com',failureRedirect:'https://discord.com/'}))
router.post('/auth/register', authController.registerUser)
router.post('/auth/login-with-google', authController.loginUser) 
// {name, email, photo}
router.post('/auth/login', authController.loginUser)
router.post('/auth/refresh-token', authController.refreshToken)

router.get('/product', productController.list)
router.post('/product',auth, productController.createProduct)
router.put('/product/:productId',auth, productController.editProduct)
router.delete('/product/:productId',auth, productController.deleteProduct)

module.exports = router