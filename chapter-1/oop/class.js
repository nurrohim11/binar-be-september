class Person {
  constructor(name, address) {
    this.name = name
    this.address = address
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

let p = new Person("Sabrina","Bandung")
p.introduce()
// p.myaddress("Demak")
// p.greet("Test")