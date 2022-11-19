const express = require('express')

const router = require('./router')
const port = process.env.PORT || 7200

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set('view engine', 'ejs')

app.use(router)

app.listen(port, ()=>{
  console.log(`server at running in port ${port}`)
})