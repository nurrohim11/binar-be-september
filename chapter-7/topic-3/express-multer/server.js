const express = require('express')
const multer = require('multer')

const storage = multer.diskStorage({
  destination:function (req, file, callback){
    callback(null,'./uploads')
  },
  filename:function(req, file, callback) {
    const myArray = file.originalname.split(".");
    const ekstensi = myArray[myArray.length - 1]
    callback(null, file.filename+ '-' + Date.now()+"."+ekstensi)
  }
})

const upload = multer({storage:storage})
const app = express()

// upload hanya 1 file
app.post('/upload', upload.single('image'), (req, res)=>{
  res.json({file:req.file})
})

// upload multi file
app.post('/upload/multi', upload.array('photos', 3), (req, res)=>{
  res.json({file:req.files})
})

app.listen(7300,()=>{
  console.log(`started at port 7300`)
})