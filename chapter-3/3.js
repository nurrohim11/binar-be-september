const strArray = ['JavaScript', 'Golang', 'C++'];
function forEach(array, callback) {
    const newArray = [];
  for(let i = 0; i < array.length; i++) {
    console.log(array[i])
    newArray.push(callback(array[i]));
  }
  return newArray;
}

const lenArray = forEach(strArray, (item) => {
  console.log(item)
    // return item
});
console.log(lenArray);