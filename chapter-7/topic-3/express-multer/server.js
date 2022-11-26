const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const storage = multer.diskStorage({
  destination:function (req, file, callback){
    callback(null,'./uploads')
  },
  filename:function(req, file, callback) {
    const myArray = file.originalname.split(".");
    const ekstensi = myArray[myArray.length - 1]
    callback(null, Date.now()+"."+ekstensi)
  }
})

const upload = multer({
  storage:storage,
  fileFilter:function(req, file, callback){
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      return callback(null, true)
    } 
    callback(null, false)
    return callback(new Error('Only .png .jpg .jpeg format allowed'))
  },
  limits:{
    // 8mb
    fileSize:8388608 //bytes
  }
})
const app = express()

cloudinary.config({
  cloud_name:'ddojbhsk7',
  api_key:'517158664842694',
  api_secret:'REsW2YDXwtecarrHo_2V03guSGg'
})

async function uploadCloudinary(filepath) {
  let result
  try {
    result = await cloudinary.uploader.upload(filepath, {
      use_filename:true
    })
    // mengahpus file image
    fs.unlinkSync(filepath)
    return result.url
  } catch (error) {
    // mengahpus file image
    fs.unlinkSync(filepath)
    return null
  }
}

// upload hanya 1 file
app.post('/upload', (req, res)=>{
  const uploadSingleImage = upload.single('image');
  uploadSingleImage(req, res, function(err){
    if (err) {
      return res.json({message:'Only .png .jpg .jpeg format allowed'})
    }
    res.json({file:req.file})
  })
})

// upload hanya 1 file
app.post('/profile/image', (req, res)=>{
  const uploadSingleImage = upload.single('image');
  uploadSingleImage(req, res, async function(err){
    if (err) {
      return res.json({message:err.message})
    }
    const uploadImage = await uploadCloudinary(req.file.path)
    if (uploadImage) {
      return res.json({
        message:'Upload berhasil',
        url:uploadImage
      })
    }
    res.json({
      message:'Upload gagal'
    })
  })
})

// upload multi file
app.post('/upload/multi', upload.array('photos', 3), async(req, res)=>{
  let urls = []
  for (const file of req.files) {
    const uploadImage = await uploadCloudinary(file.path)
    if (uploadImage) {
      urls.push(uploadImage)
    }
  }
  res.json({response:urls})
})

app.listen(7300,()=>{
  console.log(`started at port 7300`)
})