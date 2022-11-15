const routes = require('express').Router()
const article = require('../controllers/articleController')

routes.get('/api/v0/article', article.list)
routes.post('/api/v0/article', article.createArticle)
routes.put('/api/v0/article/:articleId', article.editArticle)
routes.delete('/api/v0/article/:articleId', article.deleteArticle)

module.exports = routes