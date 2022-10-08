class Kota {
  constructor(name){
    if (this.constructor == Kota){
      throw new Error("Tidak di bisa di instance sendiri")
    }
    this.name = name
  }

  #kota() {
    return "ok"
  }

  getKota(){
    return this.#kota()
  }
}

class DetailKota extends Kota {
  getKota(){
    return super.getKota()
  }
  
}

let p = new DetailKota()
console.log(p.getKota())