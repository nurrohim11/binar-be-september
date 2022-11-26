const express = require('express')
const session = require('express-session')
const passport = require('./lib/passport')

const swaggerUI = require('swagger-ui-express') // install npm
const swaggerJson = require('./docs/swagger.json') // load file swagger.json

const router = require('./router')
const port = process.env.PORT || 7200

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(session({
  secret:'rahasia',
  resave:false,
  saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson)) // use di express
app.use(router)

app.listen(port, ()=>{
  console.log(`server at running in port ${port}`)
})