function googleLogin(){
	var ref = new Firebase("https://tinderpreneurship.firebaseio.com");
	ref.authWithOAuthPopup('google', function(error, authData){
		if(error){
			console.log(error);
		}
		else{
			console.log(authData);
		}
	});
}