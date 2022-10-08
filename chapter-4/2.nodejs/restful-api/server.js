const express = require('express')
const app = express()
const port = 2004
const fs = require('fs')
var posts = require('./posts.json')

app.use(express.json())

// menampilkan semua list data posts
app.get('/api/v1/posts', (req, res)=>{
  res.json(posts).status(200)
})

// menampilkan data post sesuai dengan id
app.get('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } =req.params
  const post = posts.find(i => i.id == id)
  res.json(post)
})

// input data baru
app.post('/api/v1/posts', (req, res)=>{
  const { title, body } = req.body;
  const id = posts[posts.length - 1].id+1
  const post = { id, title, body}

  posts.push(post)

  res.json(post)
})

// edit data berdasarkan
app.put('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } =req.params
  let post = posts.find(i => i.id == id)
  const params = { title: req.body.title, body:req.body.body}
  post = {...post, ...params}

  posts = posts.map(i => i.id == post.id ? post : i)
  res.json(post)  
})

// delete data berdsarakan id
app.delete('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } = req.params
  let post = posts.find(i => i.id == id)

  if (post == undefined) {
    return res.status(404).json({
      status:404,
      message:`Post dengan id ${id} tidak ada`,
      response:null
    })
  }

  res.json({
    status:200,
    message:`Post dengan id ${post.id} berhasil dihapus`,
    response:null
  })
})

app.listen(port, () =>{
  console.log(`server running at port ${port}`)
})