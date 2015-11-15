function searchName(search){

	var name = search;

	function findByName(){
		var size = userDatabase.length;
		for(var u = 0; u < size; u++){
			//console.log(userDatabase[u].google.name.substr(0,5) + " === " + name.substr(0,5))
			if(userDatabase[u].google.name.substr(0,5) === name.substr(0,5)){
				console.log(userDatabase[u])
			}
		}
	}

	loadProfileData(findByName);

}