const checkName =(username, password) =>{
  return new Promise((resolve, reject) =>{
    if (username != 'sia') {
      return reject('username is wrong')
    }
    if (password != '123456') {
      return reject('password is wrong')
    }
    resolve('success')
  })
}

checkName('siap','1234567')
.then(res =>{
  console.log(res)
})
.catch(err =>{
  console.log(err)
})