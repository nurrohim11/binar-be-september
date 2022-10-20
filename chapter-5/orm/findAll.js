const { article } = require('./models')

article.findAll({
  where:{
    approved:false,
    title:'Testing 1'
  }
})
.then((resp) => {
  console.log(resp)
})
.catch(err =>{
  console.log(err)
})