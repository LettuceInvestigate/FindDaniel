

let numUsers = -999999;

function setNumUsers(num){
    numUsers = num;
}

function incNumUser(){
    numUsers++;
}

function decNumUser(){
    numUsers--;
}

function numOfUsers(){
    return numUsers;
}
// document.getElementById("numOfUsers").innerHTML( numOfUsers() );



// Shows the password requirements to the user when password field is clicked on
function showRequirements() 
{
	document.getElementById('password-requirements-title').style.display = "grid"; 
	document.getElementById('password-requirements-content').style.display = "grid"; 
}

function hideRequirements() 
{
	document.getElementById('password-requirements-title').style.display = "none"; 
	document.getElementById('password-requirements-content').style.display = "none"; 
}