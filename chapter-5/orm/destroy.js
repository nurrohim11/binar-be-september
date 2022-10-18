const { article } = require('./models')

article.destroy({
  where:{
    id:1
  }
})
.then(resp =>{
  console.log(resp)
})
.catch(err =>{
  console.log(err)
})