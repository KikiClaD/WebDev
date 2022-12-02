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
	
trHTML = '<tr><td>' + objJson.id + '</td><td>' + objJson.email + '</td><td>' + objJson.firstname + '</td><td>' + objJson.surname + '</td><td>' + objJson.username + '</td></tr>';
//We update our html table in our web application
$('#accountTable').append(trHTML);
$('#accountTable').show();

});
