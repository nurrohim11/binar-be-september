const { article } = require('./models')

const query = {
  where :{
    id:1
  }
}

article.update({
  body:'Fine'
}, query)
.then((resp) => {
  console.log(resp)
})
.catch(err =>{
  console.log(err)
})