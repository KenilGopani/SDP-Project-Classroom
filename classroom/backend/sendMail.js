const nodemailer = require('nodemailer')
const credential = require('./emailPassword')

const sendMail = (list, msg) => {
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: credential.user,
            pass: credential.pass,
        }
    });
    var details = {
        from: credential.user,
        to: credential.user,
        bcc: list,
        subject: 'Classroom code',
        /* Adding HTML and Text Version, so the email will not land up in the Spam folder */
        html : msg,
        text : msg 
        // html: `Hello FOLKS! <br><br>Here is your classroom code <b>${classCode}</b> for <b>${className}</b>. <br><br>Thanks,<br>KlassRoom Team.<br>`,
        // text: `Hello FOLKS! <br><br>Here is your classroom code <b>${classCode}</b> for <b>${className}</b>. <br><br>Thanks,<br>KlassRoom Team.<br>`
        // text: `Hello ! <br><br>Your ${className} classroom code is <b>${classCode}</b><br><br>Thanks,<br>KlassRoom team<br>`,
    };
    mailTransporter.sendMail(details, err => {
        if (err)
            console.log("krish: error in sending mail", err);
        else
            console.log('krish: mail sent succesfully');

    })
    console.log('krish : Mail sent..........')
}
module.exports = sendMail;