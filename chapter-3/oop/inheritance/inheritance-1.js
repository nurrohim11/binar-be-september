class Rumah {
  constructor(props){
    this.panjang = props.panjang
    this.lebar = props.lebar
  }

  hitungLuas(){
    let x = this.panjang*this.lebar
    return x
  }

}

class Bangunan extends Rumah {
  constructor(props){
    super(props)
    this.warna = props.warna
  }

  getWarna(){
    return this.warna
  }

  getPanjang(){
    return this.panjang
  }
}

let b = new Bangunan({
  panjang:10,
  lebar :10,
  warna:"Merah"
})
console.log(b.hitungLuas()) // public
console.log(b.getWarna())
console.log(b.getPanjang())