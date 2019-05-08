exports.gradeFilter = (StudentName, gradeList) => {

   

    var availableUser = false;
    var passwordiÍnDB = '';

    var gradeFilter = {
       message:'',
        grades: null
    }

    var gardeLst = [];

    for (let grade of gradeList) {

        if (StudentName.name === grade.name) {
            gardeLst.push({
                subject : grade.subject,
                score:grade.score,
                notes:grade.notes
            })
            console.log(grade.name +" "+  grade.subject + '      .................. ' + grade.notes)
        }
       
    }
    gradeFilter.grades = gardeLst;
   // console.log(StudentName.name +  validateChecker.grades + '      .................. ' + gradeList.score)
            
    return gradeFilter;
   
}