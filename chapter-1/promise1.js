const promise = new Promise((success, error) =>{
  let query = 'select * form product'
  let response = {
    docs:query
  }
  if (query != 'error') {
    success(response)
  }
  error({error:'hello query mu error'})
})

promise
.then(res =>{
  console.log(res)
})
.catch(err =>{
  console.log(err)
})