const express = require('express')
const User = require('../models/User')
const router = express.Router()


router.post('/createUser', (req, res) => {
    // res.send("Authentication..")
    // const user = User(req.body)
    // user.save() 
    // User.create({
    //     name : req.body.name,
    //     email : req.body.email,
    // })
    console.log(req.body)
    // res.send(req.body)
}

)

module.exports = router