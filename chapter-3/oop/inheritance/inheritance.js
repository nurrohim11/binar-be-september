class Laptop {
  constructor(merk, color) {
    this.merk = merk
    this.color = color
  }

  _getMerk() {
    return this.merk
  }

}

class Company extends Laptop {
  constructor(merk, color, company) {
    super(merk, color)
    this.company = company
  }

  getAll(){
    // console.log(super._getMerk())
    console.log(this.company)
  }
}

class CompanyB extends Laptop {
  constructor(merk, color, company) {
    super(merk, color)
    this.company = company
  }

  getAll(){
    // console.log(super.getMerk())
    console.log(this.company)
  }
}

let company = new Company("Lenovo","Black","SMG")
let company2 = new CompanyB("Lenovo","Black","SMG")
// company._getMerk()
console.log(company._getMerk())
// company.getAll()
