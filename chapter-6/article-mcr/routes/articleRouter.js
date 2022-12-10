const routes = require('express').Router()
const article = require('../controllers/articleController')
const { uploadSingleImage } = require('../helpers/multer')

routes.get('/api/v0/article', article.list)
routes.post('/api/v0/article', article.createArticle)
routes.put('/api/v0/article/:articleId', article.editArticle)
routes.delete('/api/v0/article/:articleId', article.deleteArticle)
routes.post('/api/v0/article/upload', uploadSingleImage.single('image'), article.uploadArticle)

module.exports = routes