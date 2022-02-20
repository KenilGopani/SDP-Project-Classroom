const mongoose = require('mongoose')
const {Schema} = mongoose

const AssignmentSchema = new mongoose.Schema({

    assignmentName : {
        type : String,
        require : true
    },
    assignmentDescription : {
        type : String,
        require : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require : true
    },
    classroomId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms',
        require : true
    }
})
module.exports = mongoose.model('Assignments',AssignmentSchema);