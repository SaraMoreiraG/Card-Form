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
    if (!checkUserCard()){
        alert.style.display = "block";
    }
    checkCardCvc();
    checkAmount();
    checkFirstName();
    checkLastName();
    checkCity();
    checkState();
    checkPostalCode();
    checkRadio();
}

function checkUserCard(){
    const USERCARDVALUE = userCard.value.trim();

    if (USERCARDVALUE === '')
        setErrorFor(userCard, 'Insert your card number');
    else if (!regex.test(USERCARDVALUE))
        setErrorFor(userCard, 'Only numbers allowed');
    else if (USERCARDVALUE.length != 16 )
        setErrorFor(userCard, 'Wrong number');
    else
        setSuccessFor(userCard);
}

function checkCardCvc(){
    const CARDCVCVALUE = cardCvc.value.trim();

    if (CARDCVCVALUE === '')
        setErrorFor(cardCvc, 'CVC can not be blank');
    else if (!regex.test(CARDCVCVALUE))
        setErrorFor(cardCvc, 'Only numbers allowed');
    else if (CARDCVCVALUE.length != 4)
        setErrorFor(cardCvc, 'Wrong number');
    else
        setSuccessFor(cardCvc);
}

function checkAmount(){
    const AMOUNT = amount.value;

    if (AMOUNT === ''){
        var validation = document.getElementById('validationAmount');
        var small = document.getElementsByTagName('small');

        small.innerText = 'Error';
        validation.className = 'validationAmount error';
    }
    else
        setSuccessFor(amount);
}

function checkFirstName(){
    const FIRSTNAME = firstName.value.trim();

    if(FIRSTNAME === '')
        setErrorFor(firstName, 'Plese, introduce your name');
    else
        setSuccessFor(firstName);
}

function checkLastName(){
    const LASTNAME = lastName.value.trim();
    
    if(LASTNAME === '')
        setErrorFor(lastName, 'Please, introduce your last name');
    else
        setSuccessFor(lastName);
}

function checkCity(){
    const CITY = city.value.trim();

    if(CITY === '')
        setErrorFor(city, 'Please, introduce your city');
    else
        setSuccessFor(city);
}

function checkState(){
    const STATE = state.value;

    if(STATE === '')
        setErrorFor(state, 'Select your State');
    else
        setSuccessFor(state);
}

function checkPostalCode(){
    const POSTALCODE = postalCode.value.trim();

    if(POSTALCODE === '')
        setErrorFor(postalCode, 'Introduce your Postal Code');
    else
        setSuccessFor(postalCode);
}

function checkRadio(){
    var radioValid = false;

    for (let i = 0; i < radio.length; i++)
    {
        if (radio[i].checked)
            radioValid = true;
    }
    if (!radioValid)
        console.log('Errorrr');
    else
        console.log('Bieeen');
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