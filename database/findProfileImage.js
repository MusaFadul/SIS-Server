exports.findProfileImage = (teacherUsername, images) => {
    var validateChecker = {
        success : '',
        message : ''
    }
    for (let image of images) {
        if (teacherUsername.name === image.name) {
            validateChecker.success = true;
            validateChecker.message = "has profile";
            break;
        }
    }
    console.log(validateChecker.success +  '          ' + validateChecker.success + "222222222220000000000000000000000000222222222222")
    return validateChecker;
}