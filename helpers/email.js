var nodemailer = require('nodemailer');

function send(to, text, value) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'irwanlearn@gmail.com',
      pass: 'Irwanlearn1ng'
    }
  });
  
  var mailOptions = {
    from: 'irwanlearn@gmail.com',
    to: to,
    subject: `YOU'VE GOT TOKEN, LET'S CLAIM IT!👊`,
    text: `YOUR TOKEN : ${text}\n VALUE: ${value}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = send