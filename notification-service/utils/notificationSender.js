const nodemailer = require('nodemailer');

const config = {
  email: {
    service: 'gmail',
    user: 'cozastore29@gmail.com',
    password: "qmhl hgwh ksmp twxd", 
    from: 'cozastore29@gmail.com'
  }
};

const sendNotification = (recipients, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });

  const mailOptions = {
    from: config.email.from,
    to: recipients,  
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending notification email:', error);
    } else {
      console.log('Notification email sent:', info.response);
    }
  });
};

module.exports = {sendNotification};
