function createCheckboxesFromArray(array){

}

function getArrayFromForm(formID){
	var response = [];
	$('#' + formID + ':checked').each(function(){
		response.push($(this).val());
	});
	return response;
}

console.log("LOADED profile.js");