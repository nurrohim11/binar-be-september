const { article } = require('./models')

article.create({
  title:'Test',
  body:"Testing",
  approved:true
})
.then(resp =>{
  console.log(resp)
})
.catch(err =>{
  console.log(err)
})