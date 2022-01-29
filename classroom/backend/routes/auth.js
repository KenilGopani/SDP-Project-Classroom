const express = require('express')
const User = require('../models/User')
const router = express.Router()


router.post('/createUser', (req, res) => {
    User.create({
        UID : req.body.UID,
        name : req.body.name,
        email : req.body.email,
    }).then((user) => res.json(user))
    .catch((err) => console.log(err))
    // res.send(req.body)
})

module.exports = router