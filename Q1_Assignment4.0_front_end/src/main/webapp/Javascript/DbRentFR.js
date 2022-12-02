const url = "http://localhost:8082/LCRDataBase/rents";

let objLinea = localStorage.getItem('token-info');

let objJson = JSON.parse(objLinea);

$(document).ready(function() {
	
	if (checkdLoggedInUser()) 
    {
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
	
		//"GET" method to retrieve info from the database and display it
        $.ajax({
            url: url,
            type: 'GET',

            crossOrigin: true,
            success: function(data){
                let value = JSON.stringify(data);
                var trHTML = '';
                //We place the information in the form of "string" in a variable
                $.each(data, function (i, item) {
					// += to display all the table
                	trHTML += '<tr><td>' + item.id + '</td><td>' + item.car + '</td><td>' + item.surname + '</td><td>' + item.firstname + '</td><td>' + item.email + '</td><td>' + item.mobile + '</td><td>' + item.dateD + '</td><td>' + item.dateR + '</td><td>' + item.comment + '</td><td>' + item.cityD + '</td><td>' + item.cityR + '</td></tr>';
                });
                //We update our html table in our web application
                $('#reservationTable').append(trHTML);
                $('#reservationTable').show();
            },
            //if there is a problem
            error: function (data) {
                console.log(data);
            }
        });


    //Method "POST" when clicking on the submit button
    $("#rentform").submit(function(event) {
        event.preventDefault();
        //We get the values of the form
        request = {
            id : $('#id').val(),
            car : $('#car').val(),
            surname : $('#surname').val(),
            firstname : $('#firstname').val(),
            email : $('#email').val(),
            mobile : $('#mobile').val(),
            dateD : $('#dateD').val(),
            dateR : $('#dateR').val(),
            comment : $('#comment').val(),
            cityD : $('#cityD').val(),
            cityR : $('#cityR').val(),
        }
        
        /*Variables*/
        var letters = /^[A-Za-z]+$/;
        var surname_len = $('#surname').val().length; //variable with the length of the surname
        var firstname_len = $('#firstname').val().length; //variable with the length of the firstname
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //mail aspect request
        var numbers = /^[0-9]+$/; //variable with all the numbers
        var mobile_len = $('#mobile').val().length; //variable with the length of the mobile
        
        let date =  Date.now();
		changedateD = ($('#dateD').val()).split("-");
		var newDateD = new Date( changedateD[0], changedateD[1] - 1, changedateD[2]);
		changedateR = ($('#dateR').val()).split("-");
		var newDateR = new Date( changedateR[0], changedateR[1] - 1, changedateR[2]);
        
        
		/*VALIDATION ID*/
		if(!$('#id').val())
		{
		alert("Merci de remplir un numero de reservation");
		id.focus();
	    return false;
		}
		if(!($('#id').val().match(numbers)))
		{
		alert("Merci d'utiliser que des chiffres");
		id.focus();
	    return false;
		}
		
		/*VALIDATION CAR*/
		if(!$('#car').val())
		{
		alert("Merci de selectionner une voiture");
		car.focus();
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
		
		/*VALIDATION MOBILE*/
		if(!$('#mobile').val())
		{
		alert("Merci de remplir votre numero de telephone");
		mobile.focus();
	    return false;
		}
		if(!($('#mobile').val().match(numbers)))
		{
		alert("Merci d'utiliser que des chiffres");
		mobile.focus();
	    return false;
		}
		if(mobile_len<8)
		{
		alert("Merci d'entrer plus de 7 chiffres");
		mobile.focus();
	    return false;
		}
		
		/*VALIDATION DEPARTURE DATE*/
		if(!$('#dateD').val())
		{
		alert("Merci de remplir une date de depart");
		dateD.focus();
	    return false;
		}
		if (newDateD <= date)
		{
		alert("Merci de selectionner une date de depart ulterieure a la date d'aujourd'hui");
		dateD.focus();
	    return false;
		}
		

		/*VALIDATION RETURN DATE*/
		if(!$('#dateR').val())
		{
		alert("Merci de remplir une date de retour");
		dateR.focus();
	    return false;
		}
		if(newDateR <= newDateD)
		{
		alert("Merci de selectionner une date de retour ulterieure a la date de depart");
		dateR.focus();
	    return false;
		}
		
		
		/*VALIDATION DEPARTURE CITY*/
		if(!$('#cityD').val())
		{
		alert("Merci de remplir une ville de depart");
		cityD.focus();
	    return false;
		}
		
		/*VALIDATION RETURN CITY*/
		if(!$('#cityR').val())
		{
		alert("Merci de remplir une ville de retour");
		cityR.focus();
	    return false;
		}
		
		/*Methods to save the input data in the database by "POST"*/
        fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(request)})
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                var trHTML = '';
                //We put the information entered by the user of the database in a string
                trHTML += '<tr><td>' + data.id + '</td><td>' + data.car + '</td><td>' + data.surname + '</td><td>' + data.firstname + '</td><td>' + data.email + '</td><td>' + data.mobile + '</td><td>' + data.dateD + '</td><td>' + data.dateR + '</td><td>' + data.comment + '</td><td>' + data.cityD + '</td><td>' + data.cityR + '</td></tr>';
            	//We update the table 
            	$('#reservationTable').append(trHTML);
            })
            //If there is an error
            .catch((error) => {
                window.alert(error); 
            });
    });
    
    /*Method to check if there is an error in sending the form*/
    function handleErrors(response){
		/*If there is an error*/
        if (!response.ok) {
            throw new Error("Le numero de reservation est deja utilise");
        }
        /*If there is no error, we save the data in a .txt file*/	
        else{
	 		let info = 
               	'Reservation number: ' + $('#id').val() + ' \r\n' +
                'Car: ' + $('#car').val() + ' \r\n' +
                'Surname: ' + $('#surname').val() + ' \r\n' +
                'First name: ' + $('#firstname').val() + ' \r\n' +
                'Email: ' + $('#email').val() + ' \r\n' +
                'Mobile: ' + $('#mobile').val() + ' \r\n' +
                'Departure date: ' + $('#dateD').val() + ' \r\n' +
                'Return date: ' + $('#dateR').val() + ' \r\n' +
                'Departure city: ' + $('#cityD').val() + ' \r\n' +
                'Return city: ' + $('#cityR').val();
        
                // Convert the text to BLOB.
                const textToBLOB = new Blob([info], { type: 'text/plain' });
                const sFileName = 'Rent.txt';      // The file to save the data.

                let newLink = document.createElement("a");
                newLink.download = sFileName;

                if (window.webkitURL != null) {
                   	newLink.href = window.webkitURL.createObjectURL(textToBLOB);
                }
                else {
                    newLink.href = window.URL.createObjectURL(textToBLOB);
                    newLink.style.display = "none";
                    document.body.appendChild(newLink);
               	}
                newLink.click(); 

           		h1.textContent = "Hello " + $('#surname').val() + " " + $('#firstname').val() + " your reservation has been created"
		
		}
        return response;
    }
});

