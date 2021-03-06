const mongoose = require('mongoose')
const {Schema} = mongoose

const SubmissionSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        require : true
    },
    classroomId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Classrooms',
        require : true
    },
    assignmentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Assignments',
        require : true
    },
    submissionFileName : {
        type : String,
        require : true
    },
    SubmissionLink : {
        type : String,
        require : true
    },
    submissionDate : {
        type : Date,
        default : Date.now
    },
    points : {
        type : Number
    }
})
module.exports = mongoose.model('Submissions',SubmissionSchema);
