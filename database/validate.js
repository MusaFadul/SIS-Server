exports.validateUser = (userSignInInfo, allUsers) => {
    var availableUser = false;
    var passwordiÍnDB = '';

    var validateChecker = {
       
        users: [],
        success: false,
        message:'',
        username:''
    }

    for (let user of allUsers) {

        if (userSignInInfo.username === user.username) {
            passwordiÍnDB = user.password;
            availableUser = true;
            break;
        }
    }
    if (availableUser) {
        if (userSignInInfo.password === passwordiÍnDB) {
            validateChecker.message = 'user is available'

            var contactList = [];
            var SingleUser = {
                name : ""
            };
            
            for (let user of allUsers) {
                if (user.username === userSignInInfo.username) {
                    validateChecker.name = user.name;
                    continue;
                }
                SingleUser.username = user.username;
                validateChecker.users.push(SingleUser);
            }
            validateChecker.message = 'Welcome again'
            //validateChecker.respond.push({success : true});
            validateChecker.success = true
        } else {
            validateChecker.message = 'password doesnt match'
        }
    } else {
        validateChecker.message = 'user is not regitered'
    }
    return validateChecker;
}

exports.validateTeacher = (loginInfo, allTeachers) => {
   
    var availableUser = false;
    var passwordiÍnDB = '';

    var validateChecker = {
       
        users: [],
        success: '',
        message:'',
        username:''
    }

    for (let user of allTeachers) {
        //console.log(loginInfo.username + loginInfo.password +'  __________' + user.username)
        if (loginInfo.username === user.username) {
            passwordiÍnDB = user.password;
            availableUser = true;
          //  console.log(loginInfo.username + loginInfo.password +'  __________' + user.username)
            //userSignInInfo.password = user.password;
           // userSignInInfo.username = user.username;
           
            break;
        }
    }
    if (availableUser) {
        if (loginInfo.password === passwordiÍnDB) {
            validateChecker.message = 'user is available'

            var contactList = [];
            var SingleUser = {
                name : ""
            };
            
            for (let user of allTeachers) {
                if (user.username === loginInfo.username) {

                   
                    validateChecker.name = user.name;
                    continue;
                }
                SingleUser.username = user.username;
                validateChecker.users.push(SingleUser);
            }
            validateChecker.message = 'Welcome again'
            //validateChecker.respond.push({success : true});
            validateChecker.success = true
        } else {
            validateChecker.message = 'password doesnt match'
        }
    } else {
        validateChecker.message = 'user is not regitered'
    }
    return validateChecker;
}