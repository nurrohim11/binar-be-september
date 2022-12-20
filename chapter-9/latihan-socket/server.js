const express = require('express')
const socketio = require('socket.io')

const app = express()

const server = app.listen(1003, () =>{
  console.log(`started server at port 1003`)
})

const io = socketio(server)

io.on('connection', (socket)=>{
  console.log('a user connected')

  socket.on('chat message', (msg)=>{
    // example message {"id":2,"message":"apakah barang ada ?"}
    let parse = JSON.parse(msg)
    io.emit(parse.id, msg) // add this line from implement broadcast
  })

  socket.on('broadcast all', (msg)=>{
    io.emit('broadcast', msg)
    console.log(`message : ${msg}`)
  })

  socket.on('disconnect',()=>{
    console.log(`user disconnect`)
  })

})