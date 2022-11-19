const express = require('express')
const session = require('express-session')
const passport = require('./lib/passport') // add this line

const router = require('./router')
const port = process.env.PORT || 7100

const app = express()

app.use(express.urlencoded({extended:false}))

app.use(session({
  secret:'rahasia',
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize()) // add this line
app.use(passport.session()) // add this line

app.set('view engine', 'ejs')

app.use(router)

app.listen(port, ()=>{
  console.log(`server at running in port ${port}`)
})