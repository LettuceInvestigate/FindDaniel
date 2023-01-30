const urlBase = 'http://whersedaneil.io/LAMPAPI';
const extension = 'php';

let userId = 0;

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

function doLogin()
{
	userId = 0;
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;

	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	var tmp = {Username:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					// ** FIX THIS WHEN FIND OUT HOW TO CHANGE **
					document.getElementById("loginResult").className = "active";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function createUser()
{
	email = document.getElementById("#email");

	if (!validateEmail(email))
	{
		alert("I am an alert box!");
	}
	let username = document.getElementById("#suspect-name");
	let password1 = document.getElementById("#password");
	let password2 = document.getElementById("retype-password");

	if (checkPassword(password1, password2))
	{
		return newUser ={ Email: email, Username: username, Password: password1 };
	}

	return newUser ={ }
}

function checkPassword(input1, input2) 
{ 
	var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	if ((input1 != input2) && !input.value.match(password))
	{
		return false
	}

	return true;
}

function validateEmail(input)
{
	let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if( input.value.match(email) )
	{
		return true;
	}
	return false;
}

function doRegister()
{
	let newUser = createUser();
	document.getElementById("registerResult").innerHTML = "";

	let jsonPayload = JSON.stringify( newUser );
	
	let url = urlBase + '/Register.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("registerResult").innerHTML = "Invalid Credientials";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("registerResult").innerHTML = err.message;
	}
	readCookie();
}

function createContact()
{
	let name = document.getElementById("contactName").value;
	let phone = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;
	let alive = document.getElementById("contactAlive").value;
	let relation = document.getElementById("contactRelation").value;
	let image = "/images/person.png";
	return newContact ={ Images: image, Name: name, Phone: phone, Email: email, Alive: alive, Relation: relation, userId: userId };
}

function addContact()
{
	let newContact = createContact();
	document.getElementById("contactAddResult").innerHTML = "";

	let jsonPayload = JSON.stringify( newContact );

	let url = urlBase + '/AddContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function deleteContact()
{
	let delContact = { ID: document.getElementById("contactID").value};
	document.getElementById("contactDeleteResult").innerHTML = "";

	let jsonPayload = JSON.stringify( delContact );

	let url = urlBase + '/RemoveContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted!";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactDeleteResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}

}
