const express = require('express')
const nodemailer = require('nodemailer')
const credential = require('../emailPassword')
const Classroom = require('../models/Classroom')
const User = require('../models/User')
const router = express.Router()

const generate_classCode = () => {
    let str = "1234567890abcdefghijklmnopqrstuvxwyz";
    let classCode = '';
    for (let i = 0; i < 7; i++) {
        let index = Math.floor(Math.random() * str.length);
        classCode += str[index];
    }
    return classCode;
}

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
}


//api
router.put('/createClassroom', async (req, res) => {

    try {
        const user = await User.findOne({ UID: req.body.owner });
        // console.log("+++++")
        // console.log(user._id)
        // console.log(req.body.owner)

        var classroom = await Classroom.create({
            className: req.body.className,
            description: req.body.description,
            classCode: generate_classCode(),
            owner: user._id,
            members: [user._id]
        })

        console.log(classroom)
        await User.findOneAndUpdate({_id : user._id}, {$push : {classrooms : classroom._id}}).catch((error) => console.log(error))
        // let u = await User.findOne({ _id: user._id}).then((u) => console.log(u))

        /********************Email *************************/
        let listOfEmail = req.body.emailList;
        listOfEmail = listOfEmail.toString();
        // console.log(listOfEmail);
        // console.log("-----")
        // console.log(classroom.className)
        let msg = `Hello FOLKS! <br><br>Here is your classroom code <b>${classroom.classCode}</b> for <b>${classroom.className}</b>. <br><br>Thanks,<br>KlassRoom Team.<br>`
       
        sendMail(listOfEmail, msg);
        /************************************************* */

        res.json({ success: true, classroom });
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }

})

router.put('/joinClassroom', async (req, res) => {
    try{
        //finding user who is requesting to join
        const user = await User.findOne({ UID: req.body.UID });
        //find class for respective classcode
        const classroom = await Classroom.findOne({classCode : req.body.classCode})
        await User.findOneAndUpdate({_id : user._id}, {$push : {classrooms : classroom._id}})
        await Classroom.findOneAndUpdate({_id : classroom._id}, {$push : {members : user._id}})

        let msg = `Thanks ${user.name} for joining <b>${classroom.className}</b> classroom.`;
        sendMail(user.email, msg);
         
        res.json({ success: true, classroom})
    }
    catch(err){
        // console.log(err);
        res.status(500).send("Internal Server Error");

    }

})

router.get('/fetchAllClassrooms', async (req, res) => {

    try {
        // console.log(req.header('UID'))
        const user = await User.findOne({ UID: req.header('UID') });
        console.log(user)
        let classroomIds = user.classrooms
        // console.log(classroomIds)
        let classrooms = await Classroom.find({ _id: { $in: classroomIds } }).populate({path : 'owner', select : 'UID name'}).populate({path : 'members', select : 'UID name'})
        // console.log(classrooms)
        res.json({ success: true, classrooms });
    }
    catch (error) {
        console(error)
        // res.status(500).send("Internal Server Error");
    }

})

router.put('/sendMail', async (req, res) => {
    try{
        let msg = `Hello FOLKS! <br><br>Here is your classroom code <b>${req.body.classCode}</b> for <b>${req.body.className}</b>. <br><br>Thanks,<br>KlassRoom Team.<br>`
        sendMail(req.body.emailList, msg);
        res.json({ success: true})
    }
    catch(err){
        // console.log(err);
        res.status(500).send("Internal Server Error");

    }
})

module.exports = router