const express = require('express')
const User = require('./../models/User')
const Classroom = require('./../models/Classroom')
const Assignment = require('./../models/Assignment')
const Submission = require('../models/Submission')
const router = express.Router()

router.get('/fetchAllUser', async (req, res) => {
    try {
        let Users = await User.find();
        res.send({ Users })
    }
    catch (err) {
        res.status(500).send("Internal server error")
        // console.log(err.message)        
    }
})

router.get('/fetchUser', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.header('id') }).populate('classrooms');
        res.send({ user })
        // res.send({success: req.header('id')})
    }
    catch (err) {
        // res.status(500).send("Internal server error")
        console.log(err.message)        
    }
})

router.delete('/deleteClassroom',async(req,res) => {
    try {
        const classroom = await Classroom.findById({_id:req.body.id});
        console.log(classroom);
        /** Deleting classroom from user model */
        const deletedClassroomFromUser = await User.find({_id:{ $in: classroom.members }}).updateMany({$pull:{classrooms: req.body.id}});
        // const ans = await User.find({_id:{ $in: classroom.members }}).updateMany({ $push : {classrooms:req.body.id}})
        console.log(deletedClassroomFromUser);
        /** Searching assignments */
        const assignment = await Assignment.find({_id:{ $in: classroom.assignments}});
        /** Searching submissions and deleting */
        let allSubmissions = [];
        assignment.map(a => {
            allSubmissions = [...allSubmissions,...a.submissions]
        })
        const deletedSubmission = await Submission.deleteMany({_id:{$in : allSubmissions}});
        console.log(deletedSubmission);
        /**------------------------------------- */
        /** Deleting assignement */
        const deletedAssignment = await Assignment.deleteMany({_id : { $in : classroom.assignments}})
        console.log(deletedAssignment);
        /**--------------------- */
        /** Deleting classroom */
        const deletedClassroom = await Classroom.deleteOne({_id:req.body.id});
        console.log(deletedClassroom);
        /**-------------------- */
        res.send({res: "success"});
    }
    catch (err) {
        // res.status(500).send("Internal server error")
        console.log(err.message)        
    }
});

router.delete('/deleteUser',async(req,res) => {
    try {
        const user = await User.deleteOne({_id:req.body.id});
        res.send({res: "success"});
    }
    catch (err) {
        // res.status(500).send("Internal server error")
        console.log(err.message)        
    }
});
module.exports = router