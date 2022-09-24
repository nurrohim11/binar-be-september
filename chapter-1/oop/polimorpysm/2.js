class Laptop {
  constructor(type) {
    this.type = type
  }

  mouse(a){
    console.log(`the type your mouse is ${this.type} `)
  }
}

class Kursi extends Laptop {
  constructor(type) {
    super(type)
  }

  mouse(a){
    console.log(`mouse is ${this.type}`)
  }
}

class Meja extends Laptop {
  constructor(type) {
    super(type)
  }

  mouse(a,harga){
    console.log(`the type your mouse is ${this.type} and price is ${harga}`)
  }
}

let kursi = new Kursi("lenovo")
kursi.mouse()
let meja = new Meja("lenovo")
meja.mouse(20000)

// buat 1 method lagi keyboard
// keyboard overriding dengan tambahan parameter harga dan jenis