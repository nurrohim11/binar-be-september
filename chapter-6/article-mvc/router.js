const router = require('express').Router()
const article = require('./controllers/articleController')

router.get('/articles', article.index)
router.get('/articles/:id', article.show)
router.get('/articles/new', article.new)
router.post('/articles', article.create)

module.exports = router