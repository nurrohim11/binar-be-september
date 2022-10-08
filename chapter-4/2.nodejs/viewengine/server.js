const express = require('express')
const app = express()
const port = 2001

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.use(express.static('public')) // add this line
// http://localhost:2001/image/img1.png

app.get('/', (req, res) =>{
  res.render('index')
})

app.get('/greet', (req, res)=>{
  console.log(req.query)
  const { name ="void" } = req.query
  res.render('greet', {
    name:name
  })
})

app.get('/register', (req, res)=>{
  res.render('register-user')
})

app.post('/register', (req, res) =>{
  const { username, password } = req.body
  res.json({
    username:username,
    password:password
  })
})

app.listen(port, () =>{
  console.log(`server running at port ${port}`)
})

// http://localhost:2001/greet?name=sabrina
// npm install express nodemon ejs