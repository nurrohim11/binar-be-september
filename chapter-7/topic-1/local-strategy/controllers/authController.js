const bcrypt = require('bcrypt')
const passport = require('passport')
const { user } = require('../models')


  const registerPage=(req, res)=>{
    res.render('register')  
  }

  const registerUser = async(req, res) =>{
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

  }

  const loginPage=(req, res) =>{
    let messages = ''
    if (req.session) {
      if(req.session.messages) {
        messages = req.session.messages[0]

        req.session.messages = []
      }
    }
    return res.render('login',{message:messages})
  }

  const login = passport.authenticate('local',{
    successRedirect:'/home',
    failureRedirect:'/login',
    failureMessage:true
  })

  const loginUser=(req, res)=>{
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

  module.exports = { registerUser, login, registerPage, loginPage }


  // module.exports = {
  //   registerPage:(req, res)=>{
  //     res.render('register')  
  //   },
  
  //   registerUser:async(req, res) =>{
  //     const { username, password } = req.body
      
  //     // encrypsi password
  //     const encryptedPassword = bcrypt.hashSync(password, 10)
  
  //     // save to db
  //     user.create({
  //       username:username, 
  //       password: encryptedPassword,
  //       createdAt: new Date(),
  //       updatedAt: new Date()
  //     })
  //     .then(resp=>{
  //       return res.redirect('/login')
  //     })
  
  //   },
  
  //   loginPage:(req, res) =>{
  //     let messages = ''
  //     if (req.session) {
  //       if(req.session.messages) {
  //         messages = req.session.messages[0]
  
  //         req.session.messages = []
  //       }
  //     }
  //     return res.render('login',{message:messages})
  //   },
  
  //   login : passport.authenticate('local',{
  //     successRedirect:'/home',
  //     failureRedirect:'/login',
  //     failureMessage:true
  //   }),
  
  //   loginUser:(req, res)=>{
  //     const { username, password } = req.body;
  
  //     user.findOne({
  //       where:{
  //         username:username
  //       }
  //     })
  //     .then(resp=>{
  //       if (resp == null) return res.status(404).json({msg:"Username not found"})
  
  //       bcrypt.compare(password, resp.password, (err, data)=>{
  //         if (err) throw err
  
  //         if (data) {
  //           res.redirect('/home')
  //         }
  //         else {
  //           return res.status(400).json({msg:"Password not same"})
  //         }
  //       })
  //     })
  //   }
  // }