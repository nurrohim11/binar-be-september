const express = require('express')
const app = express()
const port = process.env.PORT || 2006
const router = require('./routes') // tambah code ini

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

app.use(router) // tambah code ini


// TODO item

app.get('/api/v0/item', async (req, res)=>{
  const data = await item.findAll()
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

app.post('/api/v0/item', async(req, res)=>{
  const { name="", price=0, qty=0 } = req.body
  if (name == "" || price == 0 || qty == 0) {
    if (name == "") {
      return res.status(400).json({
        status:400,
        message:'Nama item tidak kosong'
      })
    }
    if (price == 0) {
      return res.status(400).json({
        status:400,
        message:'Harga tidak kosong'
      })
    }
    if (qty == 0) {
      return res.status(400).json({
        status:400,
        message:'Quantity tidak kosong'
      })
    }
  } else {
    const create = await item.create({
      name:name,
      price:price,
      qty:qty,
      createdAt:new Date(),
      updatedAt:new Date(),
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

app.put('/api/v0/item/:itemId', async(req, res)=>{
  const { itemId } = req.params
  const { name="", price=0, qty=0 } = req.body

  if (name == "" || price == 0 || qty == 0) {
    if (name == "") {
      return res.status(400).json({
        status:400,
        message:'Nama item tidak kosong'
      })
    }
    if (price == 0) {
      return res.status(400).json({
        status:400,
        message:'Harga tidak kosong'
      })
    }
    if (qty == 0) {
      return res.status(400).json({
        status:400,
        message:'Quantity tidak kosong'
      })
    }
  } else {
    const update = await item.update({
      name:name,
      price:price,
      qty:qty,
      updatedAt:new Date(),
    },{
      where:{
        id:itemId
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

app.delete('/api/v0/item/:itemId', async(req, res)=>{
  const { itemId } = req.params
  const del = await item.destroy({
    where:{
      id:itemId
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