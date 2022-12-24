const express = require('express')
require('dotenv').config()

const swaggerUI = require('swagger-ui-express') // install npm
const swaggerJson = require('./docs/swagger.json') // load file swagger.json

const router = require('./router') //
const port = process.env.PORT || 7100

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/api/health-check', (req, res)=>{
  res.json({
    message:'Health check success'
  })
})

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson)) // use di express//
app.use(router) //

app.listen(port, ()=>{
  console.log(`server at running in port ${port}`)
})