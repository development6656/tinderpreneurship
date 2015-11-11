/*--------------------------------------------*/
/*---> LISTS <--------------------------------*/
/*--------------------------------------------*/

var skills = [
	"Public Speaking",
	"Graphic Design",
	"Brainstorming",
	"Web Development",
	"Time Management",
	"Slide Decks",
	"Reports",
	"Statistics",
	"Animation",
	"Photography",
	"Finances",
	"Business Model Canvases"
];

/*--------------------------------------------*/
/*---> FORMS <--------------------------------*/
/*--------------------------------------------*/

function createHTMLCheckbox(checkboxData){
	var html = '';
	html += '<label class="checkSquareLabel">';
		html += '<input type="checkbox" name="';
		html += checkboxData['name'];
		html += '" value="';
		html += convertOptionTagName(checkboxData['value'], false);
		html += '"'
		if(checkboxData['checked']){
			html += 'checked';
		}
		html += '>';
		html += '<div class="checkSquare"></div>';
		html += checkboxData['value'];
	html += '</label>';
	return html;
}

function getArrayFromForm(formName){
	var response = [];
	$('input[name="' + formName + '"]:checked').each(function(){
		response.push($(this).val());
	});
	return response;
}

/*--------------------------------------------*/
/*---> DATABASE <-----------------------------*/
/*--------------------------------------------*/

function updateProfile(userID, profileData){
	var path = "tinderpreneurship.firebaseio.com/users/" + userID + "/profile/";
	$.each(profileData, function(key, value){
		var profileRef = new Firebase(path + key);
		profileRef.set(value);
	});
}

console.log("LOADED profile.js");