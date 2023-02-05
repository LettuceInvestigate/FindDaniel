const urlBase = 'http://wheresdaniel.io/LAMPAPI';
const extension = 'php';

let userId = 0;
let globalCounter = 0;
let contactList = new Array();
let frontendUsername;
let emptyJSON = false;

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

function wrapperDisplay() {
	for (i=0; i<5; i++) {
		loadContact(display);
		globalCounter += 1;
	}
}

function display(jsonObject)
{
	var contactInfo = jsonObject;
	console.log(contactInfo);
	//thisisanarray.push(contactJSON);
	//let contactJSON = '{"Image":"\images\person.png", "Name":"James Bond","Email":"jamesbond007@gmail.com","Phone":"678-678-6789","Relation":"Father","Alive":"Alive"}'
	//let contactInfo = JSON.parse(contactJSON)
	// check we dont repeat 
	if (!emptyJSON)
	{
		contactList.push(jsonObject);
		//creat row 
		let row = document.createElement("tr");
		row.setAttribute("class","D-tr");
		row.setAttribute("id",globalCounter);

		// creating name column
		//<td class="D-td-name" id=[incrimenter]>
		let cell1 = document.createElement("td");
		cell1.setAttribute("id","D-td-name");
		//  <img src="HIS IMAGE SORCE HERE" alt="">
		let cellImage = document.createElement("img");
		cellImage.setAttribute("src","/../images/person.png");
		cellImage.setAttribute("alt","");
		//  <div>
		let cellDiv = document.createElement("div");
		//    <h5>FULL NAME HERE</h5>
		let cellName = document.createElement("h5");
		cellName.innerHTML = contactInfo.Name;
		//    <p>EMAIL HERE</p>
		let cellEmail = document.createElement("p");
		cellEmail.innerHTML = contactInfo.Email;
		//  </div>
		cellDiv.appendChild(cellName);
		cellDiv.appendChild(cellEmail);
		//</td>
		cell1.appendChild(cellImage);
		cell1.appendChild(cellDiv);


		// creating phone column
		// <td id="D-td-num">
		let cell2 = document.createElement("td");
		cell2.setAttribute("id","D-td-num");
		//  <p>PHONE NUM HERE</p>
		let cellPhone = document.createElement("p");
		cellPhone.innerHTML = contactInfo.Phone;
		// </td>
		cell2.appendChild(cellPhone)


		// creating relation column
		//<td id="D-td-relation-status">
		let cell3 = document.createElement("td");
		cell3.setAttribute("id","D-td-relation-status");
		//  <p>RELATION HERE</p>
		let cellRelation = document.createElement("p");
		cellRelation.innerHTML = contactInfo.Relation;
		//</td>
		cell3.appendChild(cellRelation);


		// creating status column
		//<td id="D-td-relation-status">
		let cell4 = document.createElement("td");
		cell4.setAttribute("id","D-td-relation-status");
		//  <p>STATUS HERE</p>
		let cellStatus = document.createElement("p");
		cellStatus.innerHTML = contactInfo.Alive;
		//</td>
		cell4.appendChild(cellStatus);


		// creating user controls column
		//<td id="D-td-edit-delete">
		let cell5 = document.createElement("td");
		cell5.setAttribute("id","D-td-edit-delete");
		//  <a class="editButton" href="editContact()">
		let cellEdit = document.createElement("a");
		// *** MIGHT NOT WORK ***
		cellEdit.setAttribute("class", "editButton");
		cellEdit.setAttribute("href","editContact()");
		//    <li class="fas fa-user-edit"></li>
		let cellLI1 = document.createElement("li");
		cellLI1.setAttribute("class","fas fa-user-edit");
		//  </a>
		cellEdit.appendChild(cellLI1);
		//  <a class="deleteButton" href="deleteContact()">
		let cellDelete = document.createElement("a");
		// *** MIGHT NOT WORK ***
		cellDelete.setAttribute("class", "deleteButton");
		cellDelete.setAttribute("href","deleteContact()");
		//    <li class="fas fa-trash-alt"></li>
		let cellLI2 = document.createElement("li");
		cellLI2.setAttribute("class","fas fa-trash-alt");
		//  </a>
		cellDelete.appendChild(cellLI2);
		//</td>
		cell5.appendChild(cellEdit);
		cell5.appendChild(cellDelete);

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);
		row.appendChild(cell5);
		
		document.querySelector("#tbody").appendChild(row);
	}
}

function loadContact(callback)
{
	var i = 0;
	let tmp = {UserID:13,Counter:globalCounter,Counter2:1};
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
				let jsonObject = JSON.parse(xhr.responseText);
				console.log(jsonObject);
				if (jsonObject.error == "No Records Found") {
					emptyJSON = true;
					console.log(jsonObject);
					callback("Error");
				} else {
					checkRepeats(jsonObject);
					console.log(jsonObject);
					callback(jsonObject);
					console.log(jsonObject);
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

function checkRepeats() {
	while (contactList[i] !== null && jsonObject.ID !== contactList[i].ID) {
		i++;
	}
	return
}

function editContact()
{
	let id = document.getElementById("PUT THE CONTACTID HERE").value;
	let Contact = createContact();
	let tmp = {ID:id,Contact};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/EditContact.' + extension;
		
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let temp = JSON.stringify(xhr.responseText);
				let jsonObject = JSON.parse(temp );
				
				if(jsonObject.error == "")
				{
					// The object is updated I do not know what we need to do to redisplay it
					// but if you need to call something here is where we should do that
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

function deleteContact()
{
	let id = document.getElementById("PUT THE CONTACTID HERE").value;
	let delContact = {ID: id};
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
