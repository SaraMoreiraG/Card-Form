var divsValidation = document.getElementsByClassName('validation');


form.addEventListener('submit', (e) => {
    e.preventDefault();

    var countCorrect = checkFormInputs();
    countCorrect += checkState();
    countCorrect += checkRadio();
    checkAllBlanks(countCorrect);
});

function checkFormInputs(){
    var input = document.getElementsByTagName('input');
    const regex = /^[0-9]*$/;
    var count = 0;
    for (let i = 0; i < 7; i++){
        if (input[i].value == ''){
            if (i == 6)
                setErrorFor(input[i], 'Can not be blank', 7);
            else
                setErrorFor(input[i], 'Can not be blank', i);
        }
        else if (i < 3 && !regex.test(input[i].value))
            setErrorFor(input[i], 'Only numbers allowed', i);
        else if (i == 0 && input[i].value.length != 16)
            setErrorFor(input[i], 'Your card should have 16 digits', i);
        else if (i == 1 && input[i].value.length != 4)
            setErrorFor(input[i], 'Expected: 4 digits', i);
        else{
            if (i == 6)
                count += setSuccessFor(input[i], 7);
            else
                count += setSuccessFor(input[i], i);
        }
    }
    return count;
}

function checkState(){
    var state = document.getElementById('state');
    const STATE = state.value;
    var count = 0;

    if(STATE === '')
        setErrorFor(state, 'Select your State', 6);
    else 
        count += setSuccessFor(state, 6);

    return count;
}

function checkRadio(){
    var radio = document.getElementsByName('inlineRadioOptions');
    var radioValid = false;
    var count = 0;
    for (let i = 0; i < radio.length; i++)
    {
        if (radio[i].checked)
            radioValid = true;
    }
    if (!radioValid)
        setErrorFor(radio, 'Select your card tipe', 8);
    else
        count += setSuccessFor(radio, 8);
    return count;
}

function checkAllBlanks(countCorrect){
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

function refresh(){
    document.location.reload();
}