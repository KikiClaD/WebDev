const url1 = "http://localhost:8082/LCRDataBase/roles";


$(document).ready(function() {
	
	
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
			name : $('#name').val(),
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
		alert('Please insert an ID');
		id.focus();
	    return false;
		}
		if(!($('#id').val().match(numbers)))
		{
		alert("Please input numeric characters only!");
		id.focus();
	    return false;
		}
		
		/*VALIDATION SURNAME*/
		if(!$('#surname').val())
		{
		alert("Please enter your Surname");
		surname.focus();
	    return false;
		}
		if(surname_len<2)
		{
		alert("Please enter more than 1 caracter for Surname input");
		surname.focus();
	    return false;
		}
		if(!($('#surname').val().match(letters)))
		{
		alert("Please input alphabet characters only");
		surname.focus();
	    return false;
		}
		
		/*VALIDATION FIRSTNAME*/
		if(!$('#firstname').val())
		{
		alert("Please enter your Firstname");
		firstname.focus();
	    return false;
		}
		if(firstname_len<2)
		{
		alert("Please enter more than 1 caracter for First name input");
		firstname.focus();
	    return false;
		}
		if(!($('#firstname').val().match(letters)))
		{
		alert("Please input alphabet characters only");
		firstname.focus();
	    return false;
		}
		
		/*VALIDATION EMAIL*/
		if(!$('#email').val())
		{
		alert("Please enter your Email");
		email.focus();
	    return false;
		}
		if(!($('#email').val().match(mailformat)))
		{
		alert("You have entered an invalid email address!");
		email.focus();
	    return false;
		}
		
		/*VALIDATION PASSWORD*/
		if(!$('#password').val())
		{
		alert("Please enter a password");
		password.focus();
	    return false;
		}
		if(password_len<5)
		{
		alert("Please enter more than 4 caracter for First name input");
		password.focus();
	    return false;
		}
		
		if(!certify.checked)
		{
		alert("Please check the General Conditions of Use");
		certify.focus();
	    return false;
		}
		
		
		//Methods to save the input data in the database by "POST"
        fetch(url1, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(request)})
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
				console.log(data);
                var trHTML = '';
                //We put the information entered by the user of the database in a string
                trHTML += '<tr><td>' + data.id + '</td><td>' + data.username + '</td><td>' + data.firstname + '</td><td>' + data.surname + '</td><td>' + data.email + '</td><td>' + data.password + '</td><td>' + data.name + '</td></tr>';
            })
            //If there is an error
            .catch((error) => {
                window.alert(error);
            });
            //window.location.href = "../../HTML/English/Login.html"
    });

	//Method to check if there is an error in sending the form
    function handleErrors(response) {
		//If there is an error
        if (!response.ok) {
            throw new Error('The ID / Username / Email is already used');
        }
        return response;
    }

});

