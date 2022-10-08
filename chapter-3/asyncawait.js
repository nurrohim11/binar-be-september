const checkPassword = (password) =>{
  return new Promise((resolve, rejected) =>{
    if (password == '12345') {
      resolve('ok password')
    }
    rejected('fail password')
  })
}

const checkUsername = (username) =>{
  return new Promise((resolve, rejected) =>{
    if (username == '1234567') {
        resolve('ok username')
    }
    rejected('fail username')
  })
}
// await checkPassword('12345') 
async function check (){
  try {
    const u  = await checkUsername('1234567')  // success
    const a  = await checkPassword('check')  // fail
    console.log(u)
    console.log(a)
  } catch(err){
    
    console.log(err)
  }
}

check()