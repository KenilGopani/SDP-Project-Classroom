const express = require('express')
const User = require('./../models/User')
const Classroom = require('./../models/Classroom')
const Assignment = require('./../models/Assignment')
const Submission = require('./../models/Submission')
const sendMail = require('../sendMail')
const router = express.Router()

router.put('/createAssignment', async (req, res) => {

    try {
        const user = await User.findOne({ UID: req.body.UID })

        let newAssignment = await Assignment.create({
            assignmentName: req.body.assignmentName,
            assignmentDescription: req.body.assignmentDescription,
            owner: user._id,
            classroomId: req.body.classroomId
        })
        const classroom = await Classroom.findOneAndUpdate({ _id: newAssignment.classroomId }, { $push: { assignments: newAssignment._id } })
        res.send({ success: true, newAssignment })
    }
    catch (error) {
        res.status(500).send("Internal server error")
        // console.log(error)
    }
})

router.get('/fetchAllAssignment', async (req, res) => {

    try {
        // console.log(req.header('classroomId'))
        let classroom = await Classroom.findOne({ _id: req.header('classroomId') })

        let assignmentIds = classroom.assignments;
        let assignments = await Assignment.find({ _id: { $in: assignmentIds } }).populate('owner', 'UID')
        // console.log("As :- ",assignments)
        res.send({ success: true, assignments })

    }
    catch (error) {
        res.status(500).send("Internal server error")
        // console.log(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findOne({ _id: req.params.id }).populate('submissions', 'userId SubmissionLink points submissionDate')
            .populate({ path: 'submissions', populate: { path: 'userId', select: 'UID name email' } });
        console.log(assignment)
        res.json({ assignment });
        console.log(assignment);
    }
    catch (err) {
        res.status(500).send("Internal server error")
    }
});

router.put('/submitAssignment', async (req, res) => {

    try {
        // console.log("______ ", req.body.userUID)
        const user = await User.findOne({ UID: req.body.userUID }) //getting user id from uid
        const submitResponse = await Submission.create({
            userId: user._id,
            classroomId: req.body.classroomId,
            assignmentId: req.body.assignmentId,
            submissionFileName : req.body.submissionFileName,
            SubmissionLink: req.body.SubmissionLink,
            points: 0
        })
        const assignmentResponse = await Assignment.findOneAndUpdate({ _id: submitResponse.assignmentId }, { $push: { submissions: submitResponse._id } })
        res.send({ success: true, submitResponse })
    }
    catch (err) {
        // console.log(err);
        res.status(500).send("Internal Server Error")
    }
})

router.put('/reminder',async (req, res) => {
    try{
        let msg = `Hello user, <br><br> You have not submitted ${req.body.assignmentName} assignment of ${req.body.className} classroom. Submit it soon. <br>`
        console.log(req.body.list)
        sendMail(req.body.list, msg);
        console.log("krish: Remainder mail sent");
        res.json({ success: true})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");

    }
})

router.put('/personalMail',async (req, res) => {
    try{
        let msg = `Hello, <br><br> ${req.body.message}<br>`
        console.log(req.body.list)
        sendMail(req.body.list, msg);
        console.log("krish: Remainder mail sent");
        res.json({ success: true})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");

    }
})

module.exports = router