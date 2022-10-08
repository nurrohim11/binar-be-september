class Person {
  constructor(props) {
    this.name = props.name
    this.address = props.address
  }

  introduce() {
    console.log('Hello my name is '+this.name)
    console.log(`Hello my name is ${this.name}`)
  }

  greet(namex){
    console.log(`Hello my name is ${namex}`)
  }

}

Person.prototype.myaddress = function(address){
  console.log(`My address ${address}`)
}

let p = new Person({
  name:"Sabrina",
  address:"Jakarta"
})
p.introduce()
// p.myaddress("Demak")
// p.greet("Test")