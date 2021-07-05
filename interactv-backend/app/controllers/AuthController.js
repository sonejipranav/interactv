const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const registerStudent = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }

        let student = new Student({
            sname: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            uid: req.body.uid,
            role: req.body.role,
            password: hashedPass
        })
        student.save()
        .then(student => {
            res.json({
                message: 'New Student Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured! (new user register)'
            })
        })
    })
}

const loginStudent = (req, res, next) => {
    var username = req.body.emailid
    var password = req.body.password

    Student.findOne({email:username})
    .then(student => {
        if(student) {
            bcrypt.compare(password, student.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({emailidtoken: student.email}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Student Login Successful!',
                        token, // token: token
                        objid: student.id,
                        objemail: student.email
                    })
                } else {
                    res.json({
                        message: 'Password does not match.'
                    })
                }
            })
        } else {
            res.json({
                message: 'No User Found!'
            })
        }
    })
}

const registerFaculty = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }

        let faculty = new Faculty({
            fname: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            uid: req.body.uid,
            role: req.body.role,
            password: hashedPass
        })
        faculty.save()
        .then(faculty => {
            res.json({
                message: 'New Faculty Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An Error Occured! (new faculty register)'
            })
        })
    })
}

const loginFaculty = (req, res, next) => {
    var username = req.body.emailid
    var password = req.body.password

    Faculty.findOne({email:username})
    .then(faculty => {
        if(faculty) {
            bcrypt.compare(password, faculty.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result) {
                    let token = jwt.sign({emailidtoken: faculty.email}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Faculty Login Successful!',
                        token, // token: token
                        objid: faculty.id,
                        objemail: faculty.email
                    })
                } else {
                    res.json({
                        message: 'Password does not match.'
                    })
                }
            })
        } else {
            res.json({
                message: 'No User Found!'
            })
        }
    })
}

const test = (req, res, next) => {
    res.json({
        message: "test response from server",
        data: "name"
    })
}

module.exports = {
    registerStudent, loginStudent, registerFaculty, loginFaculty, test
}



// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { response } = require('express');

// const register = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
//         if(err) {
//             res.json({
//                 error: err
//             })
//         }

//         let user = new User({
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             uid: req.body.uid,
//             role: req.body.role,
//             password: hashedPass
//         })
//         user.save()
//         .then(user => {
//             res.json({
//                 message: 'New User/Student Added Successfully!'
//             })
//         })
//         .catch(error => {
//             res.json({
//                 message: 'An Error Occured! (new user register)'
//             })
//         })
//     })
// }

// const login = (req, res, next) => {
//     var username = req.body.emailid
//     var password = req.body.password

//     User.findOne({email:emailid})
//     .then(user => {
//         if(user) {
//             bcrypt.compare(password, user.password, function(err, result) {
//                 if(err) {
//                     res.json({
//                         error: err
//                     })
//                 }
//                 if(result) {
//                     let token = jwt.sign({emailidtoken: user.email}, 'verySecretValue', {expiresIn: '1h'})
//                     res.json({
//                         message: 'User/Student Login Successful!',
//                         token, // token: token
//                         email
//                     })
//                 } else {
//                     res.json({
//                         message: 'Password does not match.'
//                     })
//                 }
//             })
//         } else {
//             res.json({
//                 message: 'No User Found!'
//             })
//         }
//     })
// }

// const test = (req, res, next) => {
//     res.json({
//         message: "test response from server",
//         data: "name"
//     })
// }

// module.exports = {
//     register, login, test
// }

