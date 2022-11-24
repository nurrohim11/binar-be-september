const passport =require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
  clientID:'126440709919-9235ssk0j3p26qlbj15pl314pm719t6h.apps.googleusercontent.com',
  clientSecret:'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',
  callbackURL:'http://localhost:7200/callback'
}, (accessToken, refreshToken, profile, done)=>{
  console.log(profile)
  return done(null, profile)
}))

passport.serializeUser((user, done)=>{
  return done(null, user)
})

passport.deserializeUser((user, done)=>{
  return done(null, user)
})

module.exports = passport