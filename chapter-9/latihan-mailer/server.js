const express = require('express')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars') // add this line
const fs = require('fs')
require('dotenv').config() // add this line 

const app = express()

app.get('/send-email',(req, res)=>{
  fs.readFile('./email-template.html', {encoding: 'utf-8'}, function (err, html) {

    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port:465,
      secure:true,
      auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_PASS
      }
    })
    const email = [
      {
        name:'Rohim binar',
        address:"Semarang",
        email:'nrohim@binaracademy.org'
      },
      {
        name:'Rohim colab',
        address:"Bandung",
        email:'rohim.colab@gmail.com'
      }
    ]
    for (let i =0; i < email.length; i++) {
    
      var template = handlebars.compile(html) // add this line
      var dataEmail = {
        name: email[i].name,
        address:email[i].address
      }
      var html2send = template(dataEmail)

      const mail = {
        from: 'nrohim893@gmail.com',
        to: email[i].email,
        subject:`Hello world ${email[i].name}`, // tambahkan nama di subject
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
    }
  })
  // // ecbqsnoqcwzsxrmb
})

app.listen(9002, () =>{
  console.log(`started server at port 9002`)
})