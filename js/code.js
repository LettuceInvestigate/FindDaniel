const urlBase = 'http://wheresdaniel.io/LAMPAPI';
const extension = 'php';

let userId = 0;
let globalCounter = 0;
let thisisanarray = new Array();
let frontendUsername;

function doLogin()
{
	userId = 0;
	
	let login = document.getElementById("loginName").value;
	let password = document.getElementById("loginPassword").value;

	//var hash = md5( password );

	var tmp = {Username:login,Password:password};
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
					document.getElementById("register-error").className = "active";
					return;
				}
		
				username = jsonObject.Username;
				email = jsonObject.Email;

				frontendUsername = username;
				saveCookie();
	
				window.location.href = "dashboard.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("register-error").className = "active";
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
	if( userId <= 0 )
	{
		return 0;
	}
	else
	{
		return 10;
	}
}

function doLogout()
{
	userId = 0;
	//COOKIE DOES NOT DELETE
	document.cookie = "userId=0";
	fixTravel(page);
	window.location.href = "/../index.html";
}

function createUser()
{
	let email = document.getElementById("registerEmail").value;

	if (!validateEmail(email))
	{
		document.getElementById("invalidEmail").innerHTML("INVALID EMAIL");
	}
	let username = document.getElementById("register-suspect-name").value;
	let password1 = document.getElementById("registerPassword1").value;
	let password2 = document.getElementById("registerPassword2").value;

	if (checkPassword(password1, password2))
	{
		return newUser ={ Email: email, Username: username, Password: password1 };
	}
	document.getElementById("invalidPassword").innerHTML("Password Mismatch");
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
	let email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if( input.toLowerCase().match(email) )
	{
		return true;
	}
	return false;
}


function doRegister()
{
	let newUser = createUser();
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

function loadContact()
{
	thisisanarray = new Array();
	for(let i = 0; i < 5; i++)
	{
		let tmp = {UserID:userId,Counter:globalCounter,Counter2:globalCounter+1};
		let jsonPayload = JSON.stringify( tmp );

		let url = urlBase + '/LoadContacts.' + extension;
		
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
					if(jsonObject.error != "")
					{
						return; // here is when we run out of object in the database
					}
					else
					{
						globalCounter++;
						thisisanarray.push(jsonObject);
					}
					
				}
			};
			xhr.send(jsonPayload);
		}
		catch(err)
		{
			document.getElementById("").innerHTML = err.message;
		}
	}
}

function deleteContact()
{
	let delContact = { Name: document.getElementById("contactName").value, UserID: userId};
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

function searchContact()
{
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {Name:document.getElementById("searchText").value,UserID:userId};
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
