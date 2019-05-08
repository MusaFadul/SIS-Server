exports.onLoadStudents = (studentListDb) => {
  

    var studentList = {
       
        students: null,
        success: false,
        message:''
        
    }

    var stdList = []

  
            
            for (let student of studentListDb) {

                stdList.push({
                    name : student.name,
                    username:student.username
                })
             
            }
            studentList.students = stdList
            //validateChecker.respond.push({success : true});
           
       // console.log(studentList.students[1].name + studentList.students[1].username+"101010101")
     
    return studentList;
}