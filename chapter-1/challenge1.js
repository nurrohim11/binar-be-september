const strArray = [1,2,3,4,5,6,7,8];
function forEach(array, callback) {
    const newArray = [];
  for(let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i]));
  }
  return newArray;
}

var jml = 0
const lenArray = forEach(strArray, (item) => {
  jml += item
  if (item % 2) {
    console.log(`${item} - Ganjil` )
  } else {
    console.log(`${item} - Genap` )
  }
  return item
    // return item
});
console.log(jml);