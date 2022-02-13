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

const sendMail = (list, className, classCode) => {
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
        html: `Hello ! <br><br>Your ${className} classroom code is ${classCode}<br><br>Thanks,<br>KlassRoom team<br>`,
        text: `Hello ! <br><br>Your ${className} classroom code is ${classCode}<br><br>Thanks,<br>KlassRoom team<br>`,
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
        var classId = null;
        let classroom = await Classroom.create({
            className: req.body.className,
            description: req.body.description,
            classCode: generate_classCode(),
            owner: user._id,
            members: [user._id]
        })
        .then((classroom) => {
            classId = classroom._id
            console.log(classId)
        }).catch((err) => console.log(err.message))

        // console.log(classroom)
        let r = await User.findOneAndUpdate({_id : user._id}, {$push : {classrooms : classId}}).catch((error) => console.log(error))
        // let u = await User.findOne({ _id: user._id}).then((u) => console.log(u))

        /********************Email *************************/
        let listOfEmail = req.body.emailList;
        listOfEmail = listOfEmail.toString();
        console.log(listOfEmail);
        sendMail(listOfEmail, classroom.className, classroom.classCode);
        /************************************************* */
        res.json({ success: true, classroom });
    }
    catch (error) {
        // console.log(error)
        res.status(500).send("Internal Server Error");
    }

})

router.put('/joinClassroom', async (req, res) => {
    try{
        //finding user who is requesting to join
        const user = await User.findOne({ UID: req.body.UID });
        //find class for respective classcode
        const classroom = await Classroom.findOne({classCode : req.body.classCode})
        let r = await User.findOneAndUpdate({_id : user._id}, {$push : {classrooms : classroom._id}})
        let t = await Classroom.findOneAndUpdate({_id : classroom._id}, {$push : {members : user._id}}) 
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
        console.log(classroomIds)
        let classrooms = await Classroom.find({ _id: { $in: classroomIds } }).populate('owner', '_id className')
        console.log(classrooms)
        res.json({ success: true, classrooms });
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
        // res.status(500).send(error);
    }

})

router.get('/sendMail', async (req, res) => {

})

module.exports = router