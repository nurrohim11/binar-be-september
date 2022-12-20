const { user, refresh_token } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {

  async loginAdmin(req, res){
    const { email, password } = req.body;

    // mencari user berdasarkan email
    const userx = await user.findOne({
      where:{
        email:email,
        role:'admin'
      }
    })
    if (!userx.dataValues) {
      return res.json({status:400, message:'User not found'}).status(400)
    }

    // mengecek apakah user terverifiasi atau tidak
    if (!userx.dataValues.is_verified) {
      return res.json({status:400, message:'Maaf, akun anda belum terverifikasi. silahkan cek email untuk verifikasi'}).status(400)
    }

    console.log(userx.dataValues)
    // mengecek password user
    const isValidPassword = bcrypt.compareSync(password, userx.dataValues.password)
    if (!isValidPassword) {
      return res.json({status:400, message:'Wrong password'}).status(400)
    }

    // buat token
    const accessToken = jwt.sign({
      id:userx.id,
      name:userx.name,
      email:userx.email,
      role:userx.role,
      type:'access_token'
    }, process.env.TOKEN_SECRET_KEY, {
      expiresIn:'10m'
    })

    const refreshToken = jwt.sign({
      id:userx.id,
      name:userx.name,
      email:userx.email,
      role:userx.role,
      type:'refresh_token'
    }, process.env.TOKEN_SECRET_KEY, {
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
      name:userx.name,
      email:userx.email,
      role:userx.role,
      access_token:accessToken,
      refresh_token:refreshToken
    }
    res.json({status:200, message:'Successfull', response:response})
  }

}