const passport = require('passport')
const LocalStrategy = require('passport').Strategy
const bcrypt = require('bcrypt')

const { user } = require('../models')

// fungsi authenticate dengan passport
const authenticate= async(username, password, done) =>{
  try {
    const userx = await user.findOne({
      where:{
        username:username
      }
    })

    if (!userx) {
      return done(null, false, {message: "User not found"})
    }

    // check apakah password sama atau tidak
    const isValidPassword = await bcrypt.compareSync(password, userx.password)
    if (!isValidPassword) {
      return done(null, false, {message: "Password tidak sama"})
    }

    return done(null, userx)
  } catch(err) {
    return done(null, false, {message: err.message})
  }
}

passport.use(new LocalStrategy({
  usernameField:'username',
  passwordField:'password',
}), authenticate)

// serialize untuk membuat sesi
passport.serializeUser((user, done)=>{
  return done(null, user.id)
})

// deserialize digunakan untuk menghapus sesi
passport.deserializeUser(async(id, done)=>{
  const userx = await user.findByPk(id)
  return done(null, userx)
})

module.exports = passport