const arr = [
  {
    id:1,
    item:'Macbook',
    price:2000
  },
  {
    id:2,
    item:'Macbook M1',
    price:3000
  },
  {
    id:3,
    item:'Lenovo',
    price:5000
  }
]

const myPromise = (id) =>{
  return new Promise((resolve, reject) =>{
    for (let i=0; i <arr.length; i++) {
      if (id == arr[i].id) {
        if (arr[i].price > 2000) {
          resolve('oke bisa')
        } else {
          reject('harga harus lebih dari 2000')
        }
      }
    }
    reject('barang gag ada')
  })
}

myPromise(2)
.then(res =>{
  console.log(res)
})
.catch(err =>{
  console.log(err)
})