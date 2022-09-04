document.getElementById('feedback').addEventListener('click', openFeedbackWindow);
document.getElementById('feedback').addEventListener('click', fillFromLS);
document.getElementById('sendButton').addEventListener('click', checkForm);
document.getElementById('cancelButton').addEventListener('click', closeFeedbackWindow)
document.getElementById('cancelButton').addEventListener('click', writeLocalStorage);
window.addEventListener('unload', writeLocalStorage);
document.querySelectorAll('input').forEach((elem) => {
    elem.addEventListener('change', writeLocalStorage);
});
document.querySelector('textarea').addEventListener('change', writeLocalStorage)

let errorArray = [];
let feedbackValue = {
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    userMessage: "",
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(number) {
    let regex = /^[\d]{1}\([\d]{2,3}\)[\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/;
    return regex.test(number);
}

function clearInputs() {
    document.querySelectorAll('input').forEach((elem) => {
        elem.value = "";
    });
    document.querySelector('textarea').value = " "
}

function openFeedbackWindow() {
    document.getElementById('feedbackForm').classList.toggle('fade');
    document.getElementById('overlay').classList.toggle('overlayShow', true)

}

function closeFeedbackWindow() {
    let f = document.getElementById('feedbackForm');
    f.classList.toggle('fade');
    document.getElementById('overlay').classList.toggle('overlayShow', false)
}

function fillFromLS() {
    let form = document.forms.feedbackForm;
    form.name.value = localStorage.getItem("name");
    form.surname.value = localStorage.getItem("surname");
    form.email.value = localStorage.getItem("email");
    form.phoneNumber.value = localStorage.getItem("phoneNumber");
    form.userMessage.value = localStorage.getItem("userMessage");
}

function writeLocalStorage() {
    localStorage.setItem("name", document.getElementById('name').value);
    localStorage.setItem("surname", document.getElementById('surname').value);
    localStorage.setItem("email", document.getElementById('email').value);
    localStorage.setItem("phoneNumber", document.getElementById('phoneNumber').value);
    localStorage.setItem("userMessage", document.getElementById('userMessage').value);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function checkForm() {

    if (getCookie("alreadySend")) {
        let alreadySendOut = localStorage.getItem("name") + ' ' + localStorage.getItem("surname") + " ,your feedback is being processed!"
        alert(alreadySendOut);
    } else {

        let gotNameForm = document.getElementById('name');
        if (gotNameForm.value.length < 1) {
            console.log("name.l<1");
            errorArray.push("Name");
            gotNameForm.classList.toggle("notFilling", true);
        } else {
            gotNameForm.classList.toggle("notFilling", false);
        }
        feedbackValue.name = gotNameForm.value;

        let gotSurnameForm = document.getElementById('surname');
        if (gotSurnameForm.value.length < 1) {
            console.log("surname.l<1");
            errorArray.push("surname");
            gotSurnameForm.classList.toggle("notFilling", true);
        } else {
            gotSurnameForm.classList.toggle("notFilling", false);
        }
        feedbackValue.surname = gotSurnameForm.value;


        let gotEmailForm = document.getElementById('email');
        if (gotEmailForm.value.length < 1 || !validateEmail(gotEmailForm.value)) {
            console.log("mail.l<1");
            errorArray.push("Email");
            gotEmailForm.classList.toggle("notFilling", true);
        } else {
            gotEmailForm.classList.toggle("notFilling", false);
        }
        feedbackValue.email = gotEmailForm.value;

        let gotPhoneNumberForm = document.getElementById('phoneNumber');
        if (gotPhoneNumberForm.value.length != 0) {
            if (!validatePhone(gotPhoneNumberForm.value)) {
                errorArray.push("Phone");
                gotPhoneNumberForm.classList.toggle('notFilling', true)
            } else {
                gotPhoneNumberForm.classList.toggle('notFilling', false)
            }
            feedbackValue.phoneNumber = gotPhoneNumberForm.value;
        }


        let gotUserMessageForm = document.getElementById('userMessage');
        if (gotUserMessageForm.value.length < 1) {
            console.log("msg.l<1")
            errorArray.push("Message");
            gotUserMessageForm.classList.toggle("notFilling", true);
        } else {
            gotUserMessageForm.classList.toggle("notFilling", false);
        }
        feedbackValue.userMessage = gotUserMessageForm.value;

        console.log(feedbackValue);


        if (errorArray.length == 0) {
            send();
        } else {
            let errorOut = "Fields " + errorArray.join(', ') + " filled in incorrectly, please correct"
            alert(errorOut);
            errorArray.length = 0;
        }
    }
}

function send() {
    document.cookie = "alreadySend=true";
    let fullName = feedbackValue.name + " " + feedbackValue.surname + ", thanks for your feedback!";
    alert(fullName);
    clearInputs();
}


