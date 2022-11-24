const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { user, refresh_token } = require('../models')

const secretKey = 'secret-crud-jwt'

module.exports = {

  registerUser:async(req, res) =>{
    const { email, password } = req.body
    
    // encrypsi password
    const encryptedPassword = bcrypt.hashSync(password, 10)

    // save to db
    user.create({
      email:email, 
      password: encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(resp=>{
      return res.json({status:200, message:'Register success'})
    })
    .catch(err=>{
      console.log(err)
    })

  },

  loginUser:async(req, res)=>{
    const { email, password } = req.body;

    // mencari user berdasarkan email
    const userx = await user.findOne({
      where:{
        email:email
      }
    })
    if (!userx) {
      return res.json({status:400, message:'User not found'}).status(400)
    }

    // mengecek password user
    const isValidPassword = bcrypt.compareSync(password, userx.password)
    if (!isValidPassword) {
      return res.json({status:400, message:'Wrong password'}).status(400)
    }

    // buat token
    const accessToken = jwt.sign({
      id:userx.id,
      email:userx.email,
      type:'access_token'
    }, secretKey, {
      expiresIn:'5m'
    })

    const refreshToken = jwt.sign({
      id:userx.id,
      email:userx.email,
      type:'refresh_token'
    }, secretKey, {
      expiresIn:'2d'
    })

    await refresh_token.create({
      user_id:userx.id,
      token:refreshToken,
      createdAt:new Date(),
      updatedAt:new Date()
    })

    const response = {
      id:userx.id,
      email:userx.email,
      access_token:accessToken,
      refresh_token:refreshToken
    }
    res.json({status:200, message:'Successfull', response:response})
  },

  refreshToken:async(req, res)=>{
    const { token } = req.body
    const refreshTokenData = await refresh_token.findOne({
      where:{
        token:token
      }
    })

    if (!refreshTokenData) {
      return res.json({status:400, message:'Token not defined'}).status(40)
    }

    console.log(refreshTokenData.dataValues)

    const userx = await user.findOne({
      where:{
        id:refreshTokenData.dataValues.user_id
      }
    })

    if (!userx) {
      return res.json({status:400, message:'User not found'}).status(40)
    }

    // buat token
    const accessToken = jwt.sign({
      id:userx.id,
      email:userx.email,
      type:'access_token'
    }, secretKey, {
      expiresIn:'5m'
    })

    const reToken = jwt.sign({
      id:userx.id,
      email:userx.email,
      type:'refresh_token'
    }, secretKey, {
      expiresIn:'2d'
    })

    await refresh_token.create({
      user_id:userx.id,
      token:reToken,
      createdAt:new Date(),
      updatedAt:new Date()
    })

    const response = {
      id:userx.id,
      email:userx.email,
      access_token:accessToken,
      refresh_token:reToken
    }
    res.json({status:200, message:'Successfull', response:response})
  }
}