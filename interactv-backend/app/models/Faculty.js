const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facultySchema = new Schema({
    fname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    uid: {
        type: String
    },
    role: {
        type: String
    },
    password: {
        type: String
    },
    classroomid: {
        type: Array
    },
    members: {
        type: Array
    },
    qna: [
        {
            type: {type:String},
            question: {type: String},
            ans:[Object]
        }
    ],
    textmessages: {
        type: Array
    }
}, {timestamps: true});

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;