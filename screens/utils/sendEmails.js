// utils/sendEmail.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Remplacez par le serveur SMTP de votre fournisseur
  port: 587, // Port de votre serveur SMTP
  secure: false, // true pour port 465, false pour les autres ports
  auth: {
    user: 'your-email@example.com', // Remplacez par votre e-mail
    pass: 'your-email-password' // Remplacez par votre mot de passe
  }
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'your-email@example.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
