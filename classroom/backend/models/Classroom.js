const mongoose = require('mongoose');
const {Schema} = mongoose

const ClassroomSchema = new mongoose.Schema({

    className : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    },
    classCode : {
        type : String,
        require : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require : true
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require : true
    }],
    assignments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Assignments'
    }]
})
module.exports = mongoose.model('Classrooms',ClassroomSchema);
