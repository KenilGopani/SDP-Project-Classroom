const Classroom = require('../models/Classroom')
const User = require('../models/User')
const express = require('express')
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

router.put('/createClassroom', async (req, res) => {

    try {
        const user = await User.findOne({ UID: req.body.owner });

        // console.log("+++++")
        // console.log(user._id)
        // console.log(req.body.owner)

        let classroom = await Classroom.create({
            className: req.body.className,
            description: req.body.description,
            classCode: generate_classCode(),
            owner: user._id,
            members: [user._id]
        })
        // .then((classroom) => res.json(classroom))
        //     .catch((err) => console.log(err.message))
        console.log(classroom._id)
        await User.findOneAndUpdate({ _id: user._id}, {$push: {classrooms: classroom._id}}).then((r) => console.log())
        .catch((err) => console.log(err.message))

        res.json({ success: true, classroom});
    }
    catch(error){
        res.status(500).send("Internal Server Error");
    }
    
})

router.get('/fetchAllClassrooms', async (req, res)=> {

    try{
        // console.log(req.header('UID'))
        const user = await User.findOne({UID : req.header('UID')});
        // console.log(user.email)
        let classroomIds = user.classrooms
        // console.log(classroomIds)
        let classrooms = await Classroom.find({_id: {$in: classroomIds}}) //populate remaining 
        console.log(classrooms)
        res.json({success: true, classrooms});
    }
    catch(error){
        res.status(500).send("Internal Server Error");
        // res.status(500).send(error);
    }

})

module.exports = router