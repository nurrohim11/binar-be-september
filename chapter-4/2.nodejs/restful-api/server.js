const express = require('express')
const app = express()
const port = 2004
var posts = require('./posts.json')

app.use(express.json())

app.get('/api/v1/posts', (req, res)=>{
  res.json(posts)
})

app.get('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } =req.params
  const post = posts.find(i => i.id == id)
  res.json(post)
})

app.post('/api/v1/posts', (req, res)=>{
  const { title, body } = req.body;
  const id = posts[posts.length - 1].id+1
  const post = { id, title, body}

  posts.push(post)
  res.json(post)
})

app.put('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } =req.params
  let post = posts.find(i => i.id == id)
  const params = { title: req.body.title, body:req.body.body}
  post = {...post, ...params}

  posts = posts.map(i => i.id == post.id ? post : i)
  res.json(post)  
})

app.listen(port, () =>{
  console.log(`server running at port ${port}`)
})