const mongoose = require('mongoose');
const {Schema} = mongoose

const UserSchema = new mongoose.Schema({

    UID :{
        type : String,
        require : true,
        unique: true
    },
    name : {
        type: String,
        require: true
    },
    email : {
        type : String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        // require: true,
    },
    classrooms : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms'
    }]
})
module.exports = mongoose.model('Users',UserSchema);
