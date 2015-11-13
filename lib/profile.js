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
		html += '<input type="checkbox" onchange="recordChange(this);" name="';
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

var unsavedChanges = false;

function recordChange(elementChanged){
	//console.log(elementChanged);
	unsavedChanges = true;
}

/*
* To add updating for new fields, simply add them to profileData
*/
function updateProfile(){

	function updateProfileFields(userID, profileData){
		var path = "tinderpreneurship.firebaseio.com/users/" + userID + "/profile/";
		$.each(profileData, function(key, value){
			var profileRef = new Firebase(path + key);
			profileRef.set(value);
		});
	}

	if(userID && unsavedChanges){
		var profileData = {
			description: document.getElementById('profile-description').value,
			strengths: JSON.stringify(
					getArrayFromForm('strengths')
				),
			desires: JSON.stringify(
					getArrayFromForm('desires')
				),
			peeves: document.getElementById('profile-peeves').value
		}
		updateProfileFields(userID, profileData);
		displayMessage("Your profile has been updated.");
		unsavedChanges = false;
	}
	else{
		console.log("ERROR: UserID not authenticated. (or no changes to be saved)");
	}

}

/*--------------------------------------------*/
/*---> LOADING <------------------------------*/
/*--------------------------------------------*/

function loadProfile(){
	loadClientText('description');
	loadClientSkills('strengths');
	loadClientSkills('desires');
	loadClientText('peeves');
}

var profileSkills = [];

function loadClientSkills(formID){

	function findInList(search, array){
		var response = false;
		var size = array.length;
		for(var i = 0; i < size; i++){
			if(array[i] === search){
				response = true;
				break;
			}
		}
		return response;
	}

	function loadProfileSkills(callback){
		var path = "tinderpreneurship.firebaseio.com/users/" + userID + "/profile/";
		var skillsRef = new Firebase(path + formID);
			skillsRef.on("value", function(snapshot){
				profileSkills = JSON.parse(snapshot.val());
				callback();
			});	
	}

	function loadSkillsCallback(){
		if(userID){
			var output = document.getElementById('center-' + formID);
				output.innerHTML = "";
			var size = skills.length;
			for(var s = 0; s < size; s++){
				output.innerHTML += (createHTMLCheckbox({
					name: formID,
					value: skills[s],
					checked: findInList(convertOptionTagName(skills[s], false), profileSkills)
				}));
			}
		}
		else{
			console.log("ERROR: UserID not authenticated.");
		}
	}

	loadProfileSkills(loadSkillsCallback);

}

function loadClientText(formID){
	var output = document.getElementById('profile-' + formID);
	var path = "tinderpreneurship.firebaseio.com/users/" + userID + "/profile/";
	var textRef = new Firebase(path + formID);
		textRef.on("value", function(snapshot){
			output.value = snapshot.val();
		});	
}

var userDatabase = [];

function userFactory(data){
	var user = {
		uid: data['uid'],
		google: data['google'],
		profile: data['profile'],
		getProfileDiv: function(){
			var size;
			var html = '<div class="people">';
				html += '<button onclick="likeProfile(' + this.uid + ');">&#128077;</button>';
				html += '<h2>' + this.profile.secretname + '</h2>';
				html += '<p class="subtitle">Click the &#128077; to like this profile.</p>';
				html += '<h3>Description</h3>';
				if(this.profile.description){
					html += '<p>' + this.profile.description + '</p>';	
				}
				else{
					html += '<p>None.</p>';
				}
				html += '<h3>Skills I Have</h3>';
				html += '<ul>';
				var strengths = JSON.parse(this.profile.strengths);
				size = strengths.length;
				if(size > 0){
					for(var s = 0; s < size; s++){
						html += '<li>';
						html += convertOptionTagName(strengths[s], true);
						html += '</li>';
					}
				}
				else{
					html += '<li>None</li>'
				}
				html += '</ul>';
				html += '<h3>Skills I Want</h3>';
				html += '<ul>';
				var desires = JSON.parse(this.profile.desires);
				size = desires.length;
				if(size > 0){
					for(var s = 0; s < size; s++){
						html += '<li>';
						html += convertOptionTagName(desires[s], true);
						html += '</li>';
					}
				}
				else{
					html += '<li>None</li>'
				}
				html += '</ul>';
				html += '<h3>Pet Peeves</h3>';
				if(this.profile.peeves){
					html += '<p>' + this.profile.peeves + '</p>';	
				}
				else{
					html += '<p>None.</p>';
				}
				//html += '<div class="footerSpace"></div>';
			html += '</div>';
			return html;
		}
	}
	return user;
}

function loadProfileData(callback){
	var ref = new Firebase("https://tinderpreneurship.firebaseio.com/users");
	userDatabase = [];
	ref.on("value", function(snapshot){
		var data = snapshot.val();
		$.each(data, function(key, value){
			var user = userFactory({
				uid: key,
				google: value['google'],
				profile: value['profile']
			});
			userDatabase.push(user);
		});
		if(callback){
			callback();
		}
	});
}

function loadBrowsingProfiles(){
	var size = userDatabase.length;
	var output = document.getElementById('browsingSpace');
		output.innerHTML = "";
	for(var u = 0; u < size; u++){
		console.log(userDatabase[u].google.name)
		output.innerHTML += userDatabase[u].getProfileDiv();
	}
}

/*--------------------------------------------*/
/*---> BROWSING <-----------------------------*/
/*--------------------------------------------*/

function likeProfile(uid){
	var path = "https://tinderpreneurship.firebaseio.com/users/" + uid + "/profile/likedyou";
	var likesRef = new Firebase(path);
	likesRef.on('value', function(snapshot){
		console.log(snapshot.val());
	});
}

console.log("LOADED profile.js");