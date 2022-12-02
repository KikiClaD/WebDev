//When the page is launch
$(document).ready(function() {
 //If the user is already login
 if (checkdLoggedInUser())  
 {
	//We don't diplay the form anymore
	my_login.style.display = "none";
   
   	let objLinea = localStorage.getItem('token-info');
	let objJson = JSON.parse(objLinea);
   
   	var div = document.getElementById('connected');
   	div.innerHTML = "Hello " + objJson.username;
   
   	//We don't display the login and register button
   	logButton.style.display = "none";
   	regButton.style.display = "none";
    //We chnage the loggin and resgiter button by adding a username button and logout button
   	var div = document.getElementById('accountButton');
   	div.innerHTML += objJson.username;
   
 }
 //If the user is not login
 else
    {
		//We don't display the username button and logout button
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
	
	//Login function button
	 $('#my_login').submit(function(e) {
	  e.preventDefault();
	  e.stopPropagation();
	  //We call the function to be sure that the user is in the database
	  //and username/email and password are good
	  success = do_login();
	  if (success) {
	   //We reload the page to be sure that the user is connected
	   window.location.reload();
	   //We hide the from
	   my_login.style.display = "none";
	   //We store the form info in cookies
	   let objLinea = localStorage.getItem('token-info');
	   let objJson = JSON.parse(objLinea);
	   //We display the username
	   var div = document.getElementById('connected');
	   div.innerHTML = "Hello " + objJson.username;
	  } 
	  //If there is a problem of login
	  else {
	   alert("Invalid usernam/password")
	  }
	 });
});

//Verification function for login
function do_login() {
 //We store the form value in variables
 var email = $("#emailid").val();
 var pass = $("#password").val();
 let result = false;
 if (email != "" && pass != "") {
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
   //If all work good, we set the cookies value and we return result true
   success: function(data){
    localStorage.setItem('token-info', JSON.stringify(data));
    result = true;
   },
   //If there is something wrong happened, we return result false
    error: function (data) {
     result = false;
    }
  });
 }
 return result;  //We return the result at the end of the function
}
