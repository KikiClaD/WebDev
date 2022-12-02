//Database url
var ajaxUrl = 'http://localhost:8082/LCRDataBase/loggedInUser';
var user = null;

//Function to check is someone is logged
function checkdLoggedInUser() {
	//We take the cookies information
    localStorage.removeItem('token-info');
    let result = false;
    //We get the information from the database
    $.ajax({
        url: ajaxUrl,
        type: 'GET',
        async: false,
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        crossOrigin: true,
        //If all works good
        success: function(data){
            let value = JSON.stringify(data);
            //We set the information in the cookies
            localStorage.setItem('token-info', value);
            user = value;
            //We return result true
            result = true;  
        },
        //If there is an error, we remove the information from the cookies
        error: function (data) {
            localStorage.removeItem('token-info');
            user = null;
        }
    });
    //We return the final result
    return result;
}

