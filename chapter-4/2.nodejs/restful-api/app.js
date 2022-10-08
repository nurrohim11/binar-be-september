const express = require('express')
const app = express()
const port = 2004
const fs = require('fs')
// var posts = require('./posts.json')
var posts = './posts.json';

app.use(express.json())


const getPostFile = function() {
  return JSON.parse(fs.readFileSync(posts));
}

// menampilkan semua list data posts
app.get('/api/v1/posts', (req, res)=>{
  res.json(posts)
})

// menampilkan data post sesuai dengan id
app.get('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } =req.params
  const post = posts.find(i => i.id == id)
  res.json(post)
})

// input data baru
app.post('/api/v1/posts',  (req, res)=>{
  const { title, body } = req.body;

  const savedPost = getPostFile();
  const id = (savedPost[savedPost.length - 1] != undefined ) ? savedPost[savedPost.length - 1].id+1 : 1
  const post = {
    id:id,
    title:title,
    body:body
  }
  savedPost.push(post);
  fs.writeFile(posts, JSON.stringify(savedPost), function(err) {
    if (err) {
      console.log(err);
    }
  });

  res.json({
    status:200,
    message:'successfull',
    response:post
  })
})

// edit data berdasarkan
// app.put('/api/v1/posts/:id', (req, res)=>{
//   const { id=0 } =req.params
//   let post = posts.find(i => i.id == id)
//   const params = { title: req.body.title, body:req.body.body}
//   post = {...post, ...params}

//   posts = posts.map(i => i.id == post.id ? post : i)
//   res.json(post)  
// })
app.put('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } =req.params
  const { title, body } = req.body

  const savedPost = getPostFile();
  let post = savedPost.find(i => i.id == id)

  // const postIndex = savedPost.findIndex(i => i.id == id);
  // savedPost.splice(postIndex, 1);
  // fs.writeFile(posts, JSON.stringify(savedPost), function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  // });

})

// delete data berdsarakan id
app.delete('/api/v1/posts/:id', (req, res)=>{
  const { id=0 } = req.params

  const savedPost = getPostFile();
  let post = savedPost.find(i => i.id == id)

  if (post == undefined) {
    return res.json({
      status:404,
      message:`Post dengan id ${id} tidak ada`,
      response:null
    })
  }
  const postIndex = savedPost.findIndex(i => i.id == id);
  savedPost.splice(postIndex);
  fs.writeFile(posts, JSON.stringify(savedPost), function(err) {
    if (err) {
      console.log(err);
    }
  });

  res.json({
    status:200,
    message:`Post dengan id ${post.id} berhasil dihapus`,
    response:null
  })
})

app.listen(port, () =>{
  console.log(`server running at port ${port}`)
})