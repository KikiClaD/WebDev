$(document).ready(function() {
 if (checkdLoggedInUser())  
 {
	my_login.style.display = "none";
   
   let objLinea = localStorage.getItem('token-info');

	let objJson = JSON.parse(objLinea);
   
   var div = document.getElementById('connected');
   div.innerHTML = "Bonjour " + objJson.username;
   
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
	
 $('#my_login').submit(function(e) {
  e.preventDefault();
  e.stopPropagation();
  success = do_login();
  if (success) {
   
   window.location.reload();
   my_login.style.display = "none";
   
   let objLinea = localStorage.getItem('token-info');

	let objJson = JSON.parse(objLinea);
   
   var div = document.getElementById('connected');
   div.innerHTML = "Bonjour " + objJson.username;
   
  } else {
   alert("Invalid usernam/password")
  }
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
