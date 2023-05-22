

var fields = {}
var timer = 0
document.addEventListener("DOMContentLoaded", function(){
    fields.name = document.getElementById("name");
    fields.email = document.getElementById("email");
    fields.message = document.getElementById("message");
})

function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined' ) return false;
    return (value.length > 0);
   }
function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
        field.className = 'placeholderRed';
    } else {
        field.className = '';
    }

    return isFieldValid;
}

function isValid() {
    var valid = true;
    
    valid &= fieldValidation(fields.name, isNotEmpty);
    valid &= fieldValidation(fields.message, isNotEmpty);
    valid &= fieldValidation(fields.email, isEmail);
   
    return valid;
}
class User {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
}
function sendContact(){
    if (isValid()) {
        let usr = new User(fields.name.value,  fields.email.value, fields.message.value);
        sendEmail(usr)
    }else{
        alert('Error submitting feedback')
    }
}
function sendEmail(user){
    // uses smtp.js
    if (timer > 0){
        alert("Wait before submitting another email")
        return
    }
    Email.send({
        SecureToken : "66e2cd1c-165e-46f0-b146-2e90c1648134",
        To : "discoverposeycounty@gmail.com",
        From : "discoverposeycounty@rylanpaul.com",
        Subject : "discoverposeycounty.rylanpaul.com Form Submission",
        Body : "Name: " + user.name + "<br>Email: " + user.email + "<br><br>Message:<br>" + user.message
    }).then(
      message => alert(message + "\n" + user.name + ', thanks for the feedback!')
    );
    timer = 1
    setTimeout(addTimer, 180000)
}

function addTimer(){
   timer = 0
}