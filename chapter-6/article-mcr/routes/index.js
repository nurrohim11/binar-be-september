const router = require('express').Router()
const articleRouter = require('./articleRouter')

router.use(articleRouter)

module.exports = router