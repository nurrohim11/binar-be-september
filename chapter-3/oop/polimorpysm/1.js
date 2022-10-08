class Human {
  constructor(name){
    if (this.constructor == Human){
      throw new Error("Tidak di bisa di instance sendiri")
    }
    this.name = name
  }

  work(){
    // return ' string'
    console.log(`my name is ${this.name}`)
  }
}

class Police extends Human{
  constructor(name) {
    super(name)
  }

  // overriding
  work(){
    // return ' string'
    console.log(`Name doctor is ${this.name}`)
  }
}

class Doctor extends Human{
  constructor(name) {
    super(name)
  }

  // overloading
  work(){
    // return 0
    console.log(`Name doctor is ${this.name} with number ${number}`)
  }
}

let pol = new Police("sab")
let doc = new Doctor("rina")
pol.work()
doc.work(123)

