const nodemailer = require('nodemailer')

const sendEmail = (option) => {
    // 1e4e3960c94138f98bdf62efe0dcc017
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "bb54a9abc97840",
            pass: "04a35d04b19c55"
        }
    })

    const mailOption = {
        from: 'arazhdarloo@gmail.com',
        to: 'test@gmail.com',
        subject: option.subject,
        text: option.text
    }

    transport.sendMail(mailOption)
        .then(() => {
            console.log('message sent')
        })
        .catch(err => {
            console.log(err)
        })

}

module.exports = sendEmail