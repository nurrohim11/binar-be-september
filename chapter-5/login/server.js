const express = require('express')
const { user } = require('./models')
const app = express()
const port = 2003

app.use(express.json())

app.get('/health-check', (request, response) =>{
  response.json({
    message:'Health check success'
  })
})

// query param example
app.get('/api/items', (req, res) =>{
  const { page=1, limit=10 } = req.query
  console.log(page)
  res.json([
    {
      id:1,
      item:'Joystick PS 5'
    },
    {
      id:2,
      item:'PS 5'
    }
  ])
})

// example path queyr
app.get('/api/items/:itemId', (req, res) =>{
  const { itemId } = req.params
  console.log(itemId)
  res.json({
      id:1,
      item:'Joystick PS 5'
    })
})

app.put('/api/items/:itemId', (req, res)=>{
  const { itemId } = req.params
  const { item } = req.body

  console.log(itemId)
  console.log(item)

  res.json({message:'success'})
})

app.delete('/api/items/:itemId', (req, res)=>{
  
})

app.post('/api/v0/login', async (req, res)=>{
  const { username='', password='' } = req.body
  if (username == '' || password == '') {
    if (username == '') {
      return res.status(400).json({
        message:'Username cannot be empty'
      })
    }
    if (password == '') {
      return res.status(400).json({
        message:'Password cannot be empty'
      })
    }
  }

  const myUser = await user.findOne({
    where:{
      username:username,
    }
  })
  if (myUser == null) {
    return res.status(400).json({
      message:'User not found'
    })
  }
  if (myUser.dataValues.password != password) {
    return res.status(400).json({
      message:'Password not same'
    })
  }
  res.status(200).json({
    status:200,
    message:'Login successfull',
    response :{
      id: myUser.dataValues.id,
      name: myUser.dataValues.name,
      role: myUser.dataValues.role,
    }
  })
})

app.post('/api/v0/register', async (req, res)=>{
  const { name, username, password } = req.body
  if (username == '' || username == '' || password == '') {
    if (name == '') {
      return res.status(400).json({
        message:'Name cannot be empty'
      })
    }
    if (username == '') {
      return res.status(400).json({
        message:'Username cannot be empty'
      })
    }
    if (password == '') {
      return res.status(400).json({
        message:'Password cannot be empty'
      })
    }
  }

  // cek usename
  const myuser = await user.findOne({
    where:{
      username:username
    }
  })
  if (myuser != null) {
    return res.status(400).json({
      message:'Username not available'
    })
  }
  
  const dataUser = {
    name:name,
    username:username,
    password:password,
    role:'user',
  }

  const saveUser = await user.create(dataUser)
  if (saveUser == null) {
    return res.status(500).json({
      message:'Gagal dala menyimpan data'
    })
  }

  res.status(200).json({
    status:200,
    message:'Successfull',
    response: saveUser.dataValues
  })
})

app.use(function(req, res, next){
  res.status(404).json({
    status:'fail',
    message: "Route not found"
  })
})

app.use(function(err, req, res, next){
  res.status(500).json({
    status:'fail',
    message: err.message
  })
})

app.listen(port, () =>{
  console.log(`server running at port ${port}`)
})