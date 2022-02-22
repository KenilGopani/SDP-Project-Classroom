const express = require('express')
const User = require('./../models/User')
const Classroom = require('./../models/Classroom')
const Assignment = require('./../models/Assignment')
const router = express.Router()

router.put('/createAssignment', async (req, res) => {

    try{
        const user = await User.findOne({ UID: req.body.UID })

        let newAssignment = await Assignment.create({
            assignmentName: req.body.assignmentName,
            assignmentDescription: req.body.assignmentDescription,
            owner: user._id,
            classroomId : req.body.classroomId
        })
        const classroom = await Classroom.findOneAndUpdate({_id : newAssignment.classroomId}, {$push : {assignments: newAssignment._id}})
        res.send({ success : true, newAssignment})
    }
    catch(error){
        res.status(500).send("Internal server error")
        // console.log(error)
    }
})

router.get('/fetchAllAssignment', async (req, res) =>{

    try{
        // console.log(req.header('classroomId'))
        let classroom = await Classroom.findOne({_id : req.header('classroomId')})
        
        let assignmentIds = classroom.assignments;
        let assignments = await Assignment.find({_id : {$in : assignmentIds}}).populate('owner', 'UID')
        // console.log("As :- ",assignments)
        res.send({success:true, assignments})

    }
    catch(error){
        res.status(500).send("Internal server error")
        // console.log(error)
    }
    })

module.exports = router