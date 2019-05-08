exports.teacherList = (allTeachers) => {

    var teachers = {  
          teacherList:null
    }
var list = []
            
            for (let teacher of allTeachers) {       
              list.push( {name : teacher.name, imageURL: teacher.username + ".jpg"})
            }
    teachers.teacherList = list;
  //  console.log(teachers.teacherList+"6666666666666666666666666666")
    return teachers;
}