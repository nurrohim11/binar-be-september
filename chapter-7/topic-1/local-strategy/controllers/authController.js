const bcrypt = require('bcrypt')
const { user } = require('../models')

module.exports = {
  registerPage:(req, res)=>{
    res.render('register')  
  },

  registerUser:async(req, res) =>{
    const { username, password } = req.body
    
    // encrypsi password
    const encryptedPassword = bcrypt.hashSync(password, 10)

    // save to db
    user.create({
      username:username, 
      password: encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(resp=>{
      return res.redirect('/login')
    })

  },

  loginPage:(req, res) =>{
    res.render('login')
  },

  loginUser:(req, res)=>{
    const { username, password } = req.body;

    user.findOne({
      where:{
        username:username
      }
    })
    .then(resp=>{
      if (resp == null) return res.status(404).json({msg:"Username not found"})

      bcrypt.compare(password, resp.password, (err, data)=>{
        if (err) throw err

        if (data) {
          res.redirect('/home')
        }
        else {
          return res.status(400).json({msg:"Password not same"})
        }
      })
    })
  }
}