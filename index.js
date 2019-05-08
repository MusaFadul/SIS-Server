const express = require('express')
var socket = require('socket.io')
const sequelize_student = require('./modals/student')
const dbHandler = require('./database/dbHandler')
const validate = require('./database/validate')
const gradeFilter = require('./database/gradeFilter')
const findProfileImage = require('./database/findProfileImage')
const studentList = require('./database/studenList')
const teacherList = require('./database/teachers')
const sequelize_teacher = require('./modals/teacher')
const sequelize_grade = require('./modals/grades')
const sequelize_image = require('./modals/images')
const multer = require('multer')

const storage = multer.diskStorage({
  destination : './public/uploads/',
  filename :function(req,file,cb){
    cb(null,file.originalname,+'-'+Date.now())
  }
})

const upload = multer({
  storage : storage
}).single('image')


sequelize_teacher.sync().then(result => {}).catch(err => {
  console.log(err)
})
sequelize_grade.sync().then(result => {}).catch(err => {
  console.log(err)
})

sequelize_student.sync().then(result => {}).catch(err => {
  console.log(err)
})

sequelize_image.sync().then(result => {}).catch(err => {
  console.log(err)
})



const PORT = process.env.PORT || 5000

var app = express();
var server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
var io = socket(server);

app.use('/public',express.static('public'))

app.get('/done',(req,res)=>{
  res.send('coooooooooooooool');
})

app.post('/uploads',(req,res)=>{
 upload(req,res,(err)=>{
    if(err){console.log(err)}
    else{
      console.log(req.file)
      sequelize_image.create({
        name: req.file.originalname,
        imageURL: req.file.path,
      })
    }
 })
})

app.post('/login',(req, res)=>{
 // console.log(req)
  console.log(req.headers.username + '   ' + req.headers.password)
  const response = {
    success : true
  }
  res.status(200).json(response)
})

app.get('/uploads',(req,res)=>{
  dbHandler.imageList().then(images=>{
    const response = {
      count : images.length,
      imgs : images.map(img=>{
        return {
          name:img.name,
          imageURL:img.imageURL
        }
      })
    }
    res.status(200).json(response)
  })
})

io.on('connection', (socket) => {

  console.log('made socket connection', socket.id);
  socket.emit('text', 'wow. such event. very real time.');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('login_teacher', function (creditials) {
    console.log(creditials  + 'credential');
    dbHandler.teacherList()
    .then(allteachers => { 
      socket.emit('login_teacher', validate.validateTeacher(creditials, allteachers))

    }).catch(err => console.log(err))
    
  });

  socket.on('login', function (creditials) {
    dbHandler.contactsList()
    .then(allStudents => { 
      socket.emit('login', validate.validateUser(creditials, allStudents))
    }).catch(err => console.log(err))
    
  });

  socket.on('people', function (people) {
    console.log(people);
    dbHandler.teacherList()
    .then(allStudents => { 
      socket.emit('people',  teacherList.teacherList(allStudents));
    }).catch(err => console.log(err))
    
  });

  socket.on('hasProfileImage', function (teacherUsername){
    dbHandler.imageList().then(imges =>{
        socket.emit('hasProfileImage',findProfileImage.findProfileImage(teacherUsername, imges))
    }).catch(err => console.log(err))
  })

  
  socket.on('loadStudent', function (people) {
    dbHandler.contactsList()
    .then(allStudent => { 
      socket.emit('loadStudent',studentList.onLoadStudents(allStudent) );
    }).catch(err => console.log(err))
    
  });

  socket.on('gradeCheckOut', function (studentName) {
    //console.log(studentName.name + "000000000000000000000000000000000000");
    dbHandler.gradeList()
    .then(res=>{
      socket.emit('gradeCheckOut',  gradeFilter.gradeFilter(studentName, res));
    
    }).catch(err=>{
      console.log(err + 'errrrrrrrrrrrrrrrrrrr')
    })
    
    
  });



  socket.on('register', function (registrationInfo) {
    //console.log(registrationInfo)
    sequelize_student.sync()
      .then(result => {})
      .catch(err => {
        console.log(err)
      })
    dbHandler.addUser(registrationInfo)
      .then(res => {
        var message = 'user is registered successfully'
        socket.emit('register', {
          message: 'user is registered successfully',
          registered: true,
          username:registrationInfo.username,
          password:registrationInfo.password,
          name:registrationInfo.name,
          email:registrationInfo.email
        })
        //console.log(message)
      })
      .catch(err => {
        var errorMessage = err.errors[0].message;
        if (errorMessage === "email must be unique") socket.emit('register', {
          message: 'Email is already taken',
          registered: false,
          username:"",
          password:"",
          name:"",
          email:""
        })
        else if (errorMessage === "username must be unique") socket.emit('register', {
          message: 'Username is already taken',
          registered: false,
          username:"",
          password:"",
          name:"",
          email:""
        })
        else socket.emit('register', 'unspecified error')

        console.log(errorMessage)
      });

  });

  socket.on("register-teacher",function(registrationInfo){
    //console.log(registrationInfo)
    sequelize_teacher.sync()
      .then(result => {})
      .catch(err => {
        console.log(err)
      })

      dbHandler.addTeacher(registrationInfo)
      .then(res => {
        var message = 'user is registered successfully'
        socket.emit('register-teacher', {
          message: 'user is registered successfully',
          registered: true,
          username:registrationInfo.username,
          password:registrationInfo.password,
          name:registrationInfo.name,
          email:registrationInfo.email
        })
        console.log(message)
      })
      .catch(err => {
        var errorMessage = err.errors[0].message;
        if (errorMessage === "email must be unique") socket.emit('register-teacher', {
          message: 'Email is already taken',
          registered: '',
          username:"",
          password:"",
          name:"",
          email:""
        })
        else if (errorMessage === "username must be unique") socket.emit('register-teacher', {
          message: 'Username is already taken',
          registered: '',
          username:"",
          password:"",
          name:"",
          email:""
        })
        else socket.emit('register-teacher', 'unspecified error')
      });

  });


  socket.on("addGrade",function(gradeInfo){
   // console.log(gradeInfo)
    sequelize_grade.sync()
      .then(result => {})
      .catch(err => {
        console.log(err)
      })

      dbHandler.addGrade(gradeInfo)
      .then(res => {
        var message = 'grade is added successfully'
        socket.emit('adGrade', {
          message: 'grade is added successfully',
          success: true
        })
       // console.log(message)
      })
      .catch(err => {
        socket.emit('adGrade', {
          message: 'add notes (Identifier)',
          success: ''
        })
       
      });

  });

   
})
