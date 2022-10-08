function getUser(username) {
  const array =['dava','johan','yudistira','yudistira','fajri','intant']
  return new Promise(function (resolve, reject) {
    for (let i=0; i < array.length; i++) {
      if (username == array[i]) {
        resolve('ada')
      } 
    }
    reject('username tidak ditemukan')
  });
}

const timout= ()=>{
  // return new Promise(resolve =>{
    setTimeout(() => {
      return 'oke 5 detik'
    }, 5000)
  // }) 
}

async function check(){
  try {
    const time = timout()
    var user = await getUser('dava')
    console.log(time)
    console.log(user)
  } catch(err) {
    console.log(err)
  }
}

check()
// getUser("yudistira")
// .then(res =>{
//   console.log("Success");
//   console.log(res);
// })
// .catch(err =>{
//   console.error("Failed");
//   console.error(err);
// })

// .then(function (response) {
//     console.log("Success");
//     console.log(response);
// }, function (error) {
//     console.error("Failed");
//     console.error(error);
// });
