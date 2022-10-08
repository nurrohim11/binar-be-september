const express = require('express')
const app = express()
const port = 2002

app.use(express.json())

const logger = (req, res, next) =>{
  console.log(`my host is ${req.hostname}`)
  next()
}

app.use(logger)

// http://localhost:8000
app.get('/', (request, response) =>{
  response.send('Hello world')
})

// http://localhost:8000/app/hello/world
app.post('/', (request, response) =>{
  const { name, address } = request.body
  response.send('Hello world '+name)
})

app.get('/product', (req, res) =>{
  const { authorization } = req.headers
  console.log(`my headers is ${authorization}`)
  res.json({
    status:200,
    message:'successfull',
    response:[
      {
        id:"1",
        name:"product 1",
        qty:10,
        image:["1.png","2.png"],
        varian :[
          {
            id:"123",
            value:"Green"
          }
        ]
      },
      {
        id:"2",
        name:"product 1",
        qty:10,
        image:["1.png","2.png"],
        varian :[
          {
            id:"123",
            value:"Green"
          },
          {
            id:"123",
            value:"Green"
          },

          {
            id:"123",
            value:"Green"
          }
        ]
      }
    ]
  })
})

// req = request
// res = response
app.get('/order', (req, res) =>{
  res.json([
    {
      id:1,
      paid:true,
      user_id:"9210832918",
      products:[
        {
          id:2,
          paid:false,
          user_id:"213810283"
        },

        {
          id:2,
          paid:false,
          user_id:"213810283"
        }
      ]
    },
    {
      id:2,
      paid:false,
      user_id:"213810283"
    }
  ])
})

app.post('/order/create', (req, res)=>{
  ters
  // const { name } = req.body

  // res.json({
  //   status:'success',
  //   message:`Hallo selamat malam ${name}`
  // })
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