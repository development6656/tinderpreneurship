var userID;

function checkUserInDatabase(){
	userID = authData.google.id;
	var usersDatabase = new Firebase("https://tinderpreneurship.firebaseio.com/users" + userID);
	usersDatabase.push({
		uid: userID,
		name: authData.google.displayName
	});
}

function googleLogin(){
	var ref = new Firebase("https://tinderpreneurship.firebaseio.com");
	ref.authWithOAuthPopup('google', function(error, authData){
		if(error){
			console.log(error);
		}
		else{
			console.log(authData);
			checkUserInDatabase();
		}
	});
}