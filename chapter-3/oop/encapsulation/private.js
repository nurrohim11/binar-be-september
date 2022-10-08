class LaptopA {
  constructor(color, size) {
    this.color = color
    this.size = size
  }

  #getColor(){
    return this.color
  }

  colors(){
    return this.#getColor()
  }
}

let lp = new LaptopA("green","12")
console.log(lp.colors())