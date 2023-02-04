var form = document.getElementById('form');
var userCard = document.getElementById('userCard');
var cardCvc = document.getElementById('cardCvc');
var amount = document.getElementById('amount');
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var city = document.getElementById('city');
var state = document.getElementById('state');
var postalCode = document.getElementById('postalCode');
var radio = document.getElementsByName('inlineRadioOptions');
var alert = document.getElementById('submitError');
const regex = /^[0-9]*$/;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs(){
    if (!checkUserCard() || !checkCardCvc() || !checkAmount() || !checkFirstName() || !checkLastName() 
        || !checkCity() || !checkState() || !checkPostalCode() || !checkRadio()){
        alert.style.display = "block";
    }
    
    else{
        alert.style.display = "block";
        alert.innerText = "Your payment has been submitted";
        alert.className = "alert alert-success"
        form.reset();
    }
}

function checkUserCard(){
    const USERCARDVALUE = userCard.value.trim();

    if (USERCARDVALUE === '')
        setErrorFor(userCard, 'Insert your card number');
    else if (!regex.test(USERCARDVALUE))
        setErrorFor(userCard, 'Only numbers allowed');
    else if (USERCARDVALUE.length != 16 )
        setErrorFor(userCard, 'Your card should have 16 digits');
    else{
        setSuccessFor(userCard);
        return true;
    }
}

function checkCardCvc(){
    const CARDCVCVALUE = cardCvc.value.trim();

    if (CARDCVCVALUE === '')
        setErrorFor(cardCvc, 'CVC can not be blank');
    else if (!regex.test(CARDCVCVALUE))
        setErrorFor(cardCvc, 'Only numbers allowed');
    else if (CARDCVCVALUE.length != 4)
        setErrorFor(cardCvc, 'Expected: 4 digits');
    else{
        setSuccessFor(cardCvc);
        return true;
    }
}

function checkAmount(){
    const AMOUNT = amount.value;
    var validation = document.getElementById('validationAmount');

    if (AMOUNT === '')
        validation.className = 'validationAmount error';
    else{
        validation.className = 'validationAmount success';
        return true;
    }
}

function checkFirstName(){
    const FIRSTNAME = firstName.value.trim();

    if(FIRSTNAME === '')
        setErrorFor(firstName, 'Plese, introduce your name');
    else{
        setSuccessFor(firstName);
        return true;
    }
}

function checkLastName(){
    const LASTNAME = lastName.value.trim();
    
    if(LASTNAME === '')
        setErrorFor(lastName, 'Please, introduce your last name');
    else{
        setSuccessFor(lastName);
        return true
    }
}

function checkCity(){
    const CITY = city.value.trim();

    if(CITY === '')
        setErrorFor(city, 'Please, introduce your city');
    else{
        setSuccessFor(city);
        return true;
    }
}

function checkState(){
    const STATE = state.value;

    if(STATE === '')
        setErrorFor(state, 'Select your State');
    else{
        setSuccessFor(state);
        return true;
    }
}

function checkPostalCode(){
    const POSTALCODE = postalCode.value.trim();

    if(POSTALCODE === '')
        setErrorFor(postalCode, 'Introduce your Postal Code');
    else{
        setSuccessFor(postalCode);
        return true;
    }
}

function checkRadio(){
    var radioValid = false;
    var validation = document.getElementById('validationRadio');

    for (let i = 0; i < radio.length; i++)
    {
        if (radio[i].checked)
            radioValid = true;
    }
    if (!radioValid){
        validation.className = 'validationRadio error';
    }
    else{
        validation.className = 'validationRadio success';
        return true;
    }
}

function setErrorFor(input, message){
    var validation = input.parentElement;
    var small = validation.querySelector('small');

    small.innerText = message;
    validation.className = 'validation error';
}

function setSuccessFor(input){
    var validation = input.parentElement;
    validation.className = 'validation success';
}

function refresh(){
    document.location.reload();
}