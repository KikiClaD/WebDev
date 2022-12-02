const url2 = "http://localhost:8082/LCRDataBase/users_roles";



$(document).ready(function() {
	let id = 0;
	let role_id = 0;

	
	//Method "POST" when clicking on the submit button
    $("#registerform").submit(function(event) {
        event.preventDefault();
        //We get the values of the form
        
         id = $('#id').val();
        
        if(($('#name').val())=="ADMIN")
        {
			role_id = 1;
		}
		else
		{
			role_id = 2;
		}
		
		console.log(id);
    	console.log(role_id);
        
    });
    
    
    

    //Method "POST" when clicking on the submit button
    $("#registerform2").submit(function(event) {
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
			user_id : id,
			role_id : role_id,
        }
        
        console.log(id);
    	console.log(role_id);
        
		
		//Methods to save the input data in the database by "POST"
        fetch(url2, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(request)})
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
				console.log(data);
                var trHTML = '';
                //We put the information entered by the user of the database in a string
                trHTML += '<tr><td>' + data.id + '</td><td>' + data.username + '</td><td>' + data.firstname + '</td><td>' + data.surname + '</td><td>' + data.email + '</td><td>' + data.password + '</td><td>' + data.name + '</td><td>' + data.user_id + '</td><td>' + data.role_id + '</td></tr>';
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

