class Rumah {
  constructor(panjang, lebar){
    this.panjang = panjang
    this.lebar = lebar
  }

  hitungLuas(){
    let x = this.panjang*this.lebar
    return x
  }

}

class Bangunan extends Rumah {
  constructor(warna, panjang, lebar){
    super(panjang, lebar)
    this.warna = warna
  }

  getWarna(){
    return this.warna
  }

  getPanjang(){
    return this.panjang
  }
}

let b = new Bangunan("merah",20,30)
console.log(b.hitungLuas()) // public
console.log(b.getWarna())
console.log(b.getPanjang())