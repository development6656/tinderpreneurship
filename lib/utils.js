function convertOptionTagName(tag, toReadable){
	var response;
	if(toReadable){
		response = tag;
	}
	else{
		response = tag.replace(/\s+/g, '-').toLowerCase();
	}
	return response;
}