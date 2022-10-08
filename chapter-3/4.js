// VERSI ES5
const array1 = [1,2,3,4,5]
// let array3 = [1,2,3,4,5]

// array1 = [1,2]

function sumArray(arr, call) {
  var array2 = [1,2,3,4,5]
  const newArray = []
  for (let i =0; i< arr.length; i++) {
    newArray.push(call(arr[i]))
  }

  return newArray
}
sumArray()
array2 = [1,2,3]


let i = 0
const sum = sumArray(array, (item) =>{
  i += item
})

console.log(i)

// VERSI ES6
const arr =()=>{

}