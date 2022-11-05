const express = require('express')
const app = express()
const port = 2006
const { article } = require('./models')

// import library and file json swagger
const swaggerUI = require('swagger-ui-express')
const swaggerJson = require('./docs/swagger.json')

app.use(express.json())

app.get('/health-check', (request, response) =>{
  response.json({
    message:'Health check success'
  })
})

// setup url swagger
app.use('/api/v0/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))

app.get('/api/v0/article', async (req, res)=>{
  const data = await article.findAll({
    where:{
      approved:true
    }
  })
  if (data.length == 0) {
    return res.status(404).json({
      status:404,
      message:'Data tidak ditemukan'
    })
  }
  res.status(200).json({
    status:200,
    message:'Successfull',
    response:data
  })
})

app.post('/api/v0/article', async(req, res)=>{
  const { title="", body="", approved=false } = req.body
  if (title == "" || body == "") {
    if (title == "") {
      return res.status(400).json({
        status:400,
        message:'Title tidak kosong'
      })
    }
    if (body == "") {
      return res.status(400).json({
        status:400,
        message:'Body tidak kosong'
      })
    }
  } else {
    const create = await article.create({
      title:title,
      body:body,
      approved:approved
    })
    if (create == null) {
      return res.status(500).json({
        status:500,
        message:'Server error'
      })
    }
    res.status(200).json({
      status:200,
      message:'Successfull insert a new data',
      response:create
    })
  }
})

app.put('/api/v0/article/:articleId', async(req, res)=>{
  const { articleId } = req.params
  const { title="", body="", approved=false } = req.body

  if (title == "" || body == "") {
    if (title == "") {
      return res.status(400).json({
        status:400,
        message:'Title tidak kosong'
      })
    }
    if (body == "") {
      return res.status(400).json({
        status:400,
        message:'Body tidak kosong'
      })
    }
  } else {
    const update = await article.update({
      title:title,
      body:body,
      approved:approved
    },{
      where:{
        id:articleId
      }
    })
    if (update == null) {
      return res.status(500).json({
        status:500,
        message:'Server error'
      })
    }
    res.status(200).json({
      status:200,
      message:'Successfull update data'
    })
  }
})

app.delete('/api/v0/article/:articleId', async(req, res)=>{
  const { articleId } = req.params
  const del = await article.destroy({
    where:{
      id:articleId
    }
  })
  if (del == null) {
    return res.status(500).json({
      status:500,
      message:'Server error'
    })
  }
  res.status(200).json({
    status:200,
    message:'Successfull delete data'
  })
})

app.listen(port, () =>{
  console.log(`server running at port ${port}`)
})