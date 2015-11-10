function convertOptionTagName(tag, toReadable){
	var response;
	if(toReadable){
		response = tag;
	}
	else{
		response = tag.toLowerCase().replace(" ", "-");
	}
	return response;
}