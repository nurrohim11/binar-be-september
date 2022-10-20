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

app.post('/api/v0/login', async (req, res)=>{
  const { username, password } = req.body
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
  // do register
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