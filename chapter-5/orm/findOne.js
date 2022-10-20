const { article } = require('./models')

article.findOne({
  where :{
    approved:false
  }
})
.then((resp) => {
  console.log(resp)
})
.catch(err =>{
  console.log(err)
})