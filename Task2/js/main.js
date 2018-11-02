const fname = document.getElementById('firstName');
const lname = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phoneNumber');
const address = document.getElementById('address');
const code = document.getElementById('postalCode');
const password = document.getElementById('password');


const validateEmail = (text) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(text).toLowerCase());
}

const validator = () =>{    
    if(fname.value == "" || fname.value.length < 3 || fname.value > 20){
        document.getElementById('fnameError').innerHTML="First name is required";
        return false
    }
    if(lname.value == "" || lname.value.length < 3 || lname.value > 20){
        document.getElementById('lnameError').innerHTML="last name is required";
        return false
    }
    if(email.value == "" || !validateEmail(email.value))
    {        
        document.getElementById('emailError').innerHTML="enter a valid email";
        return false
    }
    if(phone.value.NaN || (!phone.value.includes('+358')) || phone.value.length < 6){
        document.getElementById('phoneError').innerHTML="enter number in required format";
        return false
    }
    if(code.value.NaN || code.value.length != 5){
        document.getElementById('pCodeError').innerHTML="5 numbers required";
        return false
    }
    if(password.value == "" || password.value.length < 4){
        document.getElementById('pwError').innerHTML="Password is required";
        return false
    }
    
}
