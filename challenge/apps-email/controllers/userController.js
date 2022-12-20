const { makeRandom } = require('../helpers/random')
const { user, email_token } = require('../models')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars') // add this line
const fs = require('fs')
const bcrypt = require('bcrypt')

module.exports = {

  async inviteUserWithoutButton(req, res){
    const { list_user=[] } = req.body
    if (list_user.length < 1) {
      return res.status(400).json({status:400,message:'Bad request'})
    }

    for (let i=0; i<list_user.length; i++) {
      let email = list_user[i]
      const userx = await user.findOne({
        where:{
          email:email
        }
      })

      if (userx) {
        return res.status(400).json({status:400,message:`Email ${email} sudha terdaftar`})
      }

      const arrEmail = email.split("@"); // dava@gmail.com -> ['dava','gmail.com']

      let password = makeRandom(10)
      const encryptedPassword = bcrypt.hashSync(password, 10)

      const create = await user.create({
        name:arrEmail[0],
        email:email,
        is_verified:true,
        role:'admin',
        password:encryptedPassword
      })

      if (create) {
        fs.readFile('./email/invite-1.html', {encoding: 'utf-8'}, function (err, html) {
          const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
              user:process.env.USER_MAIL,
              pass:process.env.USER_PASS
            }
          })
          var template = handlebars.compile(html) // add this line
          var dataEmail = {
            email: email,
            password:password
          }
          console.log(dataEmail)
          var html2send = template(dataEmail)
    
          const mail = {
            from: 'nrohim893@gmail.com',
            to: email,
            subject:`Hello ${arrEmail[0]}, segera login ke apps`, // tambahkan nama di subject
            html: html2send ,// add this line
            // text:'Are you okay ?',
          }
      
          transporter.sendMail(mail, (err, info)=>{
            if (err) {
              console.log(err);
            } else {
              console.log('Email has been sent: ' + info.response);
            }
          })
        })
      }
      
    }
    return res.status(200).json({status:200,message:'Successfull invite'})
  },

  async inviteUserWithButtonVerify(req, res){
    const { list_user=[] } = req.body
    if (list_user.length < 1) {
      return res.status(400).json({status:400,message:'Bad request'})
    }

    for (let i=0; i<list_user.length; i++) {
      let email = list_user[i]
      const userx = await user.findOne({
        where:{
          email:email
        }
      })

      if (userx) {
        return res.status(400).json({status:400,message:`Email ${email} sudha terdaftar`})
      }

      const arrEmail = email.split("@"); // dava@gmail.com -> ['dava','gmail.com']

      let password = makeRandom(10)
      const encryptedPassword = bcrypt.hashSync(password, 10)

      const create = await user.create({
        name:arrEmail[0],
        email:email,
        is_verified:false,
        role:'admin',
        password:encryptedPassword,
        updatedAt:new Date(),
        createdAt:new Date(),
      })

      if (create) {
        let token = makeRandom(30)
        const createToken= await email_token.create({
          user_id:create.dataValues.id,
          token:token,
          updatedAt:new Date(),
          createdAt:new Date(),
        })

        fs.readFile('./email/invite-2.html', {encoding: 'utf-8'}, function (err, html) {
          const transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth:{
              user:process.env.USER_MAIL,
              pass:process.env.USER_PASS
            }
          })
          var template = handlebars.compile(html) // add this line
          var dataEmail = {
            email: email,
            password:password,
            url:`http://localhost:7100/user/verifikasi/${token}`
          }
          console.log(dataEmail)
          var html2send = template(dataEmail)
    
          const mail = {
            from: 'nrohim893@gmail.com',
            to: email,
            subject:`Hello ${arrEmail[0]}, segera login ke apps`, // tambahkan nama di subject
            html: html2send ,// add this line
            // text:'Are you okay ?',
          }
      
          transporter.sendMail(mail, (err, info)=>{
            if (err) {
              console.log(err);
            } else {
              console.log('Email has been sent: ' + info.response);
            }
          })
        })
      }
      
    }
    return res.status(200).json({status:200,message:'Successfull invite'})
  },

  async verificationEmailWithVerify(req, res){
    const { token } = req.params
    const checkEmailToken = await email_token.findOne({
      where:{
        token:token
      }
    })

    if (!checkEmailToken) {
      res.render('verifikasi-email-fail')
    }

    const userId = checkEmailToken.dataValues.user_id
    const update = await user.update({
      is_verified:true,
      updatedAt:new Date()
    },{
      where:{
        id:userId
      }
    })

    if (!update) {
      res.render('verifikasi-email-fail')
    }
    
    res.render('verifikasi-email')
  }

}