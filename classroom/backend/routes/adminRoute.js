const express = require('express')
const User = require('./../models/User')
const Classroom = require('./../models/Classroom')
const Assignment = require('./../models/Assignment')
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
        let User = await User.findOne({ _id: req.header('id') }).populate('classrooms');
        // res.send({ User })
        res.send({success: req.header('id')})
    }
    catch (err) {
        // res.status(500).send("Internal server error")
        console.log(err.message)        
    }
})

module.exports = router