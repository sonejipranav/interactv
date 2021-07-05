const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    sname: {
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
    joinedclassroom: {
        type: Array
    }
}, {timestamps: true});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;