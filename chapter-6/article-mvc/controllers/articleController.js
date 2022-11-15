const { article, item } = require('../models')

module.exports = {
  index:(req, res)=>{
    article.findAll()
      .then((resp) => {
        res.render('articles/index', {resp})
      })
  },

  show:(req, res) =>{
    article.findOne({
      where:{
        id:req.params.id
      }
    }).then(resp=>{
      res.render('articles/show', {
        id:resp.id,
        title:resp.title,
        body:resp.body,
      })
    })
    .catch(err=>{
      res.status(404).send('Tidak menemukan artikel')
    })
  },

  new:(req, res)=>{
    res.render('articles/create')
  },

  create:(req, res) =>{
    const { title, body } = req.body
    article.create({
      title:title, body:body
    })
    .then(resp=>{
      res.redirect(`article/${resp.id}`)
    })
    .catch(err=>{
      res.status(500).send(`Gagal menambah data, karena ${err.message}`)
    })
  }
}