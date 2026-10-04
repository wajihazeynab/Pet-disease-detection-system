
const nodemailer = require('nodemailer')
require("dotenv").config();

async function sendEmail({ receiver, subject, html }) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'areebajillani206@gmail.com',
            pass: process.env.GOOGLE_APP_PASSWORD
            // user: 'keyshawn71@ethereal.email',
            // pass: 'XJRDcGUY58pF67E6Qs'
        },
    },);
    const mailOptions = {
        from: 'areebajillani206@gmail.com', // sender address
        to: receiver, // list of receivers
        subject: subject, // Subject line
        html: html, // plain text body
    };
    await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = {
    sendEmail
}