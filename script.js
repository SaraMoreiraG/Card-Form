var divsValidation = document.getElementsByClassName('validation');
var select = document.getElementById('state');

state.addEventListener('click', function dropDownStates(){
    var statesArray = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    for (var i = 0; i < statesArray.length; i++) {
        var option = document.createElement("option");
        option.value = statesArray[i];
        option.text = statesArray[i];
        state.appendChild(option);
    };
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    setMainAlert(checkFormFields());
});
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        setMainAlert(checkFormFields());
    }
});

function setMainAlert(countCorrect){
    var divMainAlert = document.getElementById('formBody');
    var mainAlert = document.createElement('div');
    var alertClass = '';
    var alertMessage = ''
    if (countCorrect < 9){
        if (!document.querySelectorAll("#formBody .alert").length > 0){
            alertClass = 'alert alert-danger'
            alertMessage = 'Some fields are missing';
        }
    }
    else{
        if (document.querySelectorAll("#formBody .alert").length > 0){
            mainAlert = document.querySelector("#formBody .alert");
        }
        alertClass = 'alert alert-success'
        alertMessage = 'Your payment has been submitted';
    }
    mainAlert.className = alertClass;
    mainAlert.innerHTML = alertMessage;
    divMainAlert.insertBefore(mainAlert, divMainAlert.firstChild);
}

function checkFormFields(){
    var countCorrect = 0;

    var input = document.getElementsByTagName('input');
    for (let i = 0; i < 7; i++){
        var error = checkErrors(input[i], i);
        if (error >= 1 && i == 6)
            setErrorFor(input[i], setMessage(error), 7);
        else if (error < 1 && i == 6)
            countCorrect += setSuccessFor(input[i], 7);
        if (error < 1 && i != 6)
            countCorrect += setSuccessFor(input[i], i);
        else
            setErrorFor(input[i], setMessage(error), i);
    }

    const SELECT = state.value;
    if(SELECT === '')
        setErrorFor(state, 'Select your State', 6);
    else
        countCorrect += setSuccessFor(state, 6);

    var radio = document.getElementsByName('inlineRadioOptions');
    var radioValid = false;
    for (let i = 0; i < radio.length; i++){
        if (radio[i].checked)
            radioValid = true;
    }
    if (!radioValid)
        setErrorFor(radio, 'Select your card tipe', 8);
    else
        countCorrect += setSuccessFor(radio, 8);
    return countCorrect;
}

function checkErrors (inputNode, i){
    var error = 1;
    let regex = /^[0-9]*$/;

    if (inputNode.value == '') error = 1;
    else if (i < 3 && !regex.test(inputNode.value)) error = 2;
    else if (i == 0 && inputNode.value.length != 16) error = 3;
    else if (i == 1 && inputNode.value.length != 4) error = 4;
    else error = 0;

    return error;
}

function setErrorFor(input, message, index){
    var validation = divsValidation[index];

    if(!validation.hasChildNodes()){
        input.className = 'form-control border-danger';

        var newI = document.createElement('i');
        newI.className = 'fas fa-exclamation-circle text-danger d-block position-absolute mt-1';
        validation.appendChild(newI);

        var newSmall = document.createElement('small');
        newSmall.className = 'text-danger d-block ms-4 mt-1';
        validation.appendChild(newSmall);
    }
    validation.lastChild.innerHTML = message;
}

function setMessage(error){
    var message = '';

    if (error == 1) message += 'Can not be blank';
    else if (error == 2) message += 'Only numbers allowed';
    else if (error == 3) message += 'Your card should have 16 digits';
    else if (error == 4) message += 'Expected: 4 digits';
    else if (error == 6) message += 'Is a 6';

    return message;
}

function setSuccessFor(input, index){
    var validation = divsValidation[index];
    if(validation.hasChildNodes()){
        while (validation.firstChild) {
            validation.removeChild(validation.firstChild);
        }
    }

    input.className = 'form-control border-success';
    var newI = document.createElement('i');
    newI.className = 'fas fa-check-circle text-success d-block position-absolute mt-1';
    validation.appendChild(newI);
    return (1);
}

/*function refresh(){
    document.location.reload();
}*/
