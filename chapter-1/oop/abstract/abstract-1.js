class Human {
  constructor(name){
    if (this.constructor == Human){
      throw new Error("Tidak di bisa di instance sendiri")
    }
    this.name = name
  }

  getName(){
    return this.name
  }
}

class Engineer extends Human {
  constructor(name) {
    super(name)
  }
  
}

// let human = new Human("nme")

let pl = new Engineer("sabrina")
console.log(pl.getName())