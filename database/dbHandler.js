const sequelize = require('sequelize')
const students = require('../modals/student');
const teachers = require('../modals/teacher');
const grades = require('../modals/grades');
const connection = require('../modals/connection');
const images = require('../modals/images');


exports.addUser = (userInfo) => {
    console.log("adddddddddddddddddddddddddd" + userInfo.name)
    return students.create({
        name: userInfo.name,
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email
    })
}

exports.addTeacher = (teacherInfo) => {
    return teachers.create({
        name: teacherInfo.name,
        username: teacherInfo.username,
        password: teacherInfo.password,
        email: teacherInfo.email
    })
}

exports.addGrade = (gradeInfo) => {
    return grades.create({
        name: gradeInfo.student,
        subject: gradeInfo.subject,
        score: gradeInfo.score,
        notes: gradeInfo.notes
    })
}


exports.contactsList = () => {
    return students.findAll()
}

exports.teacherList = () => {
    return teachers.findAll()
}

exports.gradeList = () => {
    return grades.findAll()
}

exports.imageList = () => {
    return images.findAll()
}

exports.connection = (token, connectionTable) => {
    return connectionTable.create({
        setionId: token.sessionID,
        sender: token.sender,
        receiver: token.receiver,
        message: token.message,
        sentAt: token.sentAt,
    })
}

exports.messagePool = (tableName) => {
    return connection(tableName).findAll();
}