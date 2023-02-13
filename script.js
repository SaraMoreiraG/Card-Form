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
    setMainAlert(checkForm());
});
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        setMainAlert(checkForm());
    }
});

function setMainAlert(countCorrect){
    var divMainAlert = document.getElementById('formBody');
    var alertClass = '';
    var alertMessage = ''

    //CHECK IF THERE IS ALREADY MAIN ALERT
    if (document.querySelectorAll("#formBody .alert").length > 0){
        var mainAlert = document.querySelector("#formBody .alert");
    }
    else
        var mainAlert = document.createElement('div');

    //SET ERROR OR SUCCESS
    if (countCorrect < 9){
        alertClass = 'alert alert-danger'
        alertMessage = 'Some fields are missing';
    }
    else{
        alertClass = 'alert alert-success'
        alertMessage = 'Your payment has been submitted';
    }

    mainAlert.className = alertClass;
    mainAlert.innerHTML = alertMessage;
    divMainAlert.insertBefore(mainAlert, divMainAlert.firstChild);
}

function checkForm(){
    var countCorrect = checkInputs();
    countCorrect += checkSelect();
    countCorrect +=checkRadio();

    return countCorrect;
}

function checkInputs(){
    var countCorrect = 0;
    var input = document.getElementsByTagName('input');
    for (let i = 0; i < 7; i++){
        var error = setErrors(input[i], i);

        //Special case for Postal Code
        if (i == 6 && error < 1)
            countCorrect += setSuccessFor(input[i], 7);
        else if (i == 6 && error >= 1)
            setErrorFor(input[i], setMessage(error), 7);

        //Check rest of inputs
        else if (error < 1 && i != 6)
            countCorrect += setSuccessFor(input[i], i);
        else
            setErrorFor(input[i], setMessage(error), i);
    }
    return countCorrect;
}

function checkSelect(){
    const SELECT = state.value;
    var countCorrect = 0;
    if(SELECT === '')
        setErrorFor(state, 'Select your State', 6);
    else
        countCorrect += setSuccessFor(state, 6);
    return countCorrect;
}

function checkRadio(){
    var radio = document.getElementsByName('inlineRadioOptions');
    var radioValid = false;
    var countCorrect = 0;
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

function setErrorFor(input, message, index){
    var validation = divsValidation[index];

    if (validation.hasChildNodes())
        var newI = validation.firstChild;
    else {
        var newI = document.createElement('i');
        validation.appendChild(newI);

        var newSmall = document.createElement('small');
        validation.appendChild(newSmall);
    }

    if (newI.className == 'fas fa-check-circle text-success d-block position-absolute mt-1'){
        var newSmall = document.createElement('small');
        validation.appendChild(newSmall);
    }
    else
        var newSmall = validation.lastChild;

    input.className = 'form-control border-danger';
    newI.className = 'fas fa-exclamation-circle text-danger d-block position-absolute mt-1';
    newSmall.className = 'text-danger d-block ms-4 mt-1';
    validation.lastChild.innerHTML = message;
}

function setErrors (inputNode, i){
    var error = 1;
    let regex = /^[0-9]*$/;

    if (inputNode.value == '') error = 1;
    else if (i < 3 && !regex.test(inputNode.value)) error = 2;
    else if (i == 0 && inputNode.value.length != 16) error = 3;
    else if (i == 1 && inputNode.value.length != 4) error = 4;
    else error = 0;

    return error;
}

function setMessage(error){
    var message = '';

    if (error == 1) message += 'Can not be blank';
    else if (error == 2) message += 'Only numbers allowed';
    else if (error == 3) message += 'Your card should have 16 digits';
    else if (error == 4) message += 'Expected: 4 digits';

    return message;
}
