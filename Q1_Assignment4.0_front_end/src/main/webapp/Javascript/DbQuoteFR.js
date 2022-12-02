const url = "http://localhost:8082/LCRDataBase/quotes";

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

    //Method "POST" when clicking on the submit button
    $("#quoteform").submit(function(event) {
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
		alert("Merci de remplir un numero de devis");
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
            throw new Error('Le numero de devis est deja utilise');
        }
        /*If there is no error, we save the data in a .txt file*/	
        else{
	 		let info = 
               	'Numero de devis: ' + $('#id').val() + ' \r\n' +
                'Voiture: ' + $('#car').val() + ' \r\n' +
                'Nom de famille: ' + $('#surname').val() + ' \r\n' +
                'Prenom: ' + $('#firstname').val() + ' \r\n' +
                'Email: ' + $('#email').val() + ' \r\n' +
                'Telephone: ' + $('#mobile').val() + ' \r\n' +
                'Date de depart: ' + $('#dateD').val() + ' \r\n' +
                'Date de retour: ' + $('#dateR').val() + ' \r\n' +
                'Ville de depart: ' + $('#cityD').val() + ' \r\n' +
                'Ville de retour: ' + $('#cityR').val();
        
                // Convert the text to BLOB.
                const textToBLOB = new Blob([info], { type: 'text/plain' });
                const sFileName = 'Devis.txt';      // The file to save the data.

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

           		h1.textContent = "Bonjour " + $('#surname').val() + " " + $('#firstname').val() + " votre devis a bien ete cree"
		}
        return response;
    }
});
