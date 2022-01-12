var express = require('express');
var router = express.Router();
var fs = require('fs');
const nodemailer = require("nodemailer");
const { getMaxListeners } = require('process');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/about', function (req, res, next) {
  res.render('about');
});

router.get('/events', function (req, res, next) {
  res.render('gallery');
});

router.get('/contact', function (req, res, next) {
  res.render('contact');
});

router.post('/submit', function (req, res) {
  let name = req.body.name
  let email = req.body.email
  let number = req.body.number
  fs.appendFile('data.txt', `name: ${name}, email: ${email}, number: ${number}\n`, function (e) {
    if (e) {
      console.log(e)
    }

    var transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: 'mdummy532@gmail.com',
        pass: 'dummy@101'

      
    }
  });

var mailOptions = {
  from: 'mdummy532@gmail.com',
  to: req.body.email,
  subject: 'Successfully Tickets Booked',
  text: 'Congratulations! You have successfully booked the ticket for  the upcoming event.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error){
    console.log(error);
  } else {
    res.render('success')
  }
});
})
})

router.get('/submit', (req,res)=>{
  res.render('success');
});

  module.exports = router;
