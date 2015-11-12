function convertOptionTagName(tag, toReadable){
	var response;
	if(toReadable){
		//Not ready for this case yet.
	}
	else{
		response = tag.replace(/\s+/g, '-').toLowerCase();
	}
	return response;
}

function initCollapsingHeader() {
	window.addEventListener('scroll', function(e){
		var distanceY = window.pageYOffset || document.documentElement.scrollTop,
			shrinkOn = 50,
			header = document.querySelector("header");
		if(distanceY > shrinkOn) {
			classie.add(header,"smaller");
		} 
		else{
			if(classie.has(header,"smaller")) {
				classie.remove(header,"smaller");
			}
		}
	});
}
window.onload = initCollapsingHeader();

console.log("LOADED utils.js");