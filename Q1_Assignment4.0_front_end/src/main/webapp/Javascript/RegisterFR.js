const url = "http://localhost:8082/LCRDataBase/users";


$(document).ready(function() {
 if (checkdLoggedInUser())  
 {
   registerform.style.display = "none";
   let objLinea = localStorage.getItem('token-info');

	let objJson = JSON.parse(objLinea);
   
   var div = document.getElementById('alreadyConnected');
   div.innerHTML = "Bonjour " + objJson.username + ", vous etes deja connecte";
   
   logButton.style.display = "none";
   regButton.style.display = "none";
    	
   var div = document.getElementById('accountButton');
   div.innerHTML += objJson.username;
 }
 else
    {
		//account.style.display = "none";
		accountButton.style.display = "none";
		logout.style.display = "none";
	}
	
	
	//Method "POST" when clicking on the submit button
    $("#registerform").submit(function(event) {
        event.preventDefault();
        //We get the values of the form
        request = {
            id : $('#id').val(),
            username : $('#username').val(),
            firstname : $('#firstname').val(),
            surname : $('#surname').val(),
            email : $('#email').val(),
            password : $('#password').val(),

        }
        
        /*Variables*/
        var letters = /^[A-Za-z]+$/;
        var surname_len = $('#surname').val().length; //variable with the length of the surname
        var firstname_len = $('#firstname').val().length; //variable with the length of the firstname
        var numbers = /^[0-9]+$/; //variable with all the numbers
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //mail aspect request
        var password_len = $('#password').val().length; //variable with the length of the password
     
        /*VALIDATION ID*/
        if(!$('#id').val() )
        {
		alert('Merci de remplir votre identifiant');
		id.focus();
	    return false;
		}
		if(!($('#id').val().match(numbers)))
		{
		alert("Merci d'utiliser que des chiffres");
		id.focus();
	    return false;
		}
		
		/*VALIDATION SURNAME*/
		if(!$('#surname').val())
		{
		alert("Merci de remplir votre nom de famille");
		surname.focus();
	    return false;
		}
		if(surname_len<2)
		{
		alert("Votre nom de famille doit contenir plus d'une lettre");
		surname.focus();
	    return false;
		}
		if(!($('#surname').val().match(letters)))
		{
		alert("Merci d'utiliser que des lettres");
		surname.focus();
	    return false;
		}
		
		/*VALIDATION FIRSTNAME*/
		if(!$('#firstname').val())
		{
		alert("Merci de remplir votre prenom");
		firstname.focus();
	    return false;
		}
		if(firstname_len<2)
		{
		alert("Votre prenom doit contenir plus d'une lettre");
		firstname.focus();
	    return false;
		}
		if(!($('#firstname').val().match(letters)))
		{
		alert("Merci d'utiliser que des lettres");
		firstname.focus();
	    return false;
		}
		
		/*VALIDATION EMAIL*/
		if(!$('#email').val())
		{
		alert("Merci de remplir votre email");
		email.focus();
	    return false;
		}
		if(!($('#email').val().match(mailformat)))
		{
		alert("Merci d'utiliser une adresse mail valide");
		email.focus();
	    return false;
		}
		
		/*VALIDATION PASSWORD*/
		if(!$('#password').val())
		{
		alert("Merci de remplir votre mot de passe");
		password.focus();
	    return false;
		}
		if(password_len<5)
		{
		alert("Votre mot de passe doit contenir plus de 4 lettres");
		password.focus();
	    return false;
		}
		
		if(!certify.checked)
		{
		alert("Merci de cocher la case des Conditions Generales d'Utilisation");
		certify.focus();
	    return false;
		}
		
		
		//Methods to save the input data in the database by "POST"
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(request)})
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                var trHTML = '';
                //We put the information entered by the user of the database in a string
                trHTML += '<tr><td>' + data.id + '</td><td>' + data.username + '</td><td>' + data.firstname + '</td><td>' + data.surname + '</td><td>' + data.email + '</td><td>' + data.password + '</td></tr>';
            })
            //If there is an error
            .catch((error) => {
                window.alert(error);
            });
            window.location.href = "../../HTML/French/Login.html"
    });

	//Method to check if there is an error in sending the form
    function handleErrors(response) {
		//If there is an error
        if (!response.ok) {
            throw new Error("L'ID, le nom d'utilisateur ou l'adresse mail est deja utilise");
        }
        return response;
    }
	
	
	$("#logout").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "http://localhost:8082/LCRDataBase/logout",
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            crossOrigin: true,
            success: function(data){
                localStorage.removeItem('token-info');
                window.location.reload();
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
	
});

function do_login() {

 var email = $("#emailid").val();
 var pass = $("#password").val();
 let result = false;
 if (email != "" && pass != "") {
 // $("#loading_spinner").css({"display": "block"});
  $.ajax({
   type: 'post',
   async: false,
   cache: false,
   url: 'http://localhost:8082/LCRDataBase/login',
   xhrFields: {
    withCredentials: true
   },
   headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type':'application/x-www-form-urlencoded',
    "Access-Control-Allow-Origin": "*",
   },
   data: {
    email: email,
    username: email,
    password: pass
   },
   crossOrigin: true,
   success: function(data){
    localStorage.setItem('token-info', JSON.stringify(data));
    result = true;
   },
    error: function (data) {
     result = false;
    }
  });
 }
 return result;
}
