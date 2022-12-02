//Get the information cookies
let objLinea = localStorage.getItem('token-info');
let objJson = JSON.parse(objLinea);

//When the page is loaded
$(document).ready(function() {
	//We check if there is someone logged
    if (checkdLoggedInUser()) 
    {
		//We don't display login and register button
    	logButton.style.display = "none";
    	regButton.style.display = "none";
    	//We display username and logout button
    	var div = document.getElementById('accountButton');
      	div.innerHTML += objJson.username;
    	
    }
    else
    {
		//We don't display username and logout button
		accountButton.style.display = "none";
		logout.style.display = "none";
	}
    
	//Logout button function
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
				//We remove from the localStorage the info stored in cookies
                localStorage.removeItem('token-info');
                //We reload the page to be sure that the user is not connected anymore
                window.location.reload();
            },
            //If we have a code error
            error: function (data) {
                console.log(data);
            }
        });
    });

});
