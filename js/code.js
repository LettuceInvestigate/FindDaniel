const urlBase = 'http://wheresdaniel.io/LAMPAPI';
const extension = 'php';

let userId = 0;
let globalCounter = 0;
let tempIndex = 0;
let contArr = new Array();
let emptyJSON = false;
let frontendUsername = "";

//FRONTEND:

//Add Contact:
function showAddModal(){
    document.getElementById('addModal').showModal();
}
function cancelAddModal(){
    document.getElementById('addModal').close();
}
function saveAddModal(){
    addContact();

	globalCounter = 0;
	setTimeout(function(){
		loadOnTable();
		contArr = new Array();
	}, 250); 
	document.getElementById("addName").value = "";
	document.getElementById("addNum").value = "";
	document.getElementById("addEmail").value = "";
	document.getElementById("addRelation").value = "";

    document.getElementById('addModal').close();
}
//Edit Contact
function showEditModal(id){
	tempID = id;
	let editFields = contArr.filter(Object => Object.ID == tempID);
	document.getElementById("editModalHeader").innerHTML = editFields[0].Name;
	document.getElementById("editName").value = editFields[0].Name;
	document.getElementById("editNum").value = editFields[0].Phone;
	document.getElementById("editEmail").value = editFields[0].Email;
	document.getElementById("editRelation").value = editFields[0].Relation;
    document.getElementById('editModal').showModal();
}
function cancelEditModal(){
    document.getElementById('editModal').close();
}
function saveEditModal(){	
    editContact( tempID );
    document.getElementById('editModal').close();
}
//Delete Contact
function showDeleteModal(id){
	tempID = id;
	let editFields = contArr.filter(Object => Object.ID == tempID);
	document.getElementById("deleteModalHeader").innerHTML = editFields[0].Name;
    document.getElementById('deleteModal').showModal();
}
function cancelDeleteModal(){
    document.getElementById('deleteModal').close();
}
function saveDeleteModal(){
    deleteContact( tempID );
    document.getElementById('deleteModal').close();
}
function displayUsername(){
	document.getElementById("user-name-title").innerHTML = "hi";
}

//API:

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
		
				frontendUsername = jsonObject.Username;
				email = jsonObject.Email;

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
	let name = document.getElementById("addName").value;
	let phone = document.getElementById("addNum").value;
	let email = document.getElementById("addEmail").value;
	let alive = document.getElementById("addStatus").value;
	let relation = document.getElementById("addRelation").value;
	let image = "/images/person.png";
	return newContact ={ Images: image, Name: name, Phone: phone, Email: email, Alive: alive, Relation: relation, UserID: userId };
}

function addContact()
{
	let newContact = createContact();

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
				location.reload();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("").innerHTML = err.message;
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
	let contactInfo = jsonObject;
	// check we dont repeat 
	if (!emptyJSON)
	{
		contArr.push(contactInfo);
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
		cellEdit.setAttribute("id",contactInfo.ID);
		cellEdit.setAttribute("onclick","showEditModal(this.id);");
		//    <li class="fas fa-user-edit"></li>
		let cellLI1 = document.createElement("li");
		cellLI1.setAttribute("class","fas fa-user-edit");
		//  </a>
		cellEdit.appendChild(cellLI1);
		//  <a class="deleteButton" href="deleteContact()">
		let cellDelete = document.createElement("a");
		// *** MIGHT NOT WORK ***
		cellDelete.setAttribute("class", "deleteButton");
		cellDelete.setAttribute("id",contactInfo.ID);
		cellDelete.setAttribute("onclick","showDeleteModal(this.id);");
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
	let tmp = {UserID:userId,Counter:globalCounter,Counter2:1};
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

				if (jsonObject.error !== "No Records Found") {
					callback(jsonObject);
				} else {
					emptyJSON = true;
					callback("Error");
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

function createEditContact(id)
{
	let name = document.getElementById("editName").value;
	let phone = document.getElementById("editNum").value;
	let email = document.getElementById("editEmail").value;
	let alive = document.getElementById("editStatus").value;
	let relation = document.getElementById("editRelation").value;
	let image = "/images/person.png";
	return newContact ={ Images: image, Name: name, Phone: phone, Email: email, Alive: alive, Relation: relation, ID: id };

}

function editContact(id)
{
	let contact = createEditContact(id);
	let jsonPayload = JSON.stringify( contact );

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
				location.reload();
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

function deleteContact(id)
{
	let delContact = {ID: id};

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
				location.reload();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("").innerHTML = err.message;
	}
	
}

function searchContact()
{
	let contactList = "";
	// drops all rows on table and all globals
	table = document.getElementById("tbody");
	while(table.firstChild)
	{
		table.removeChild(table.lastChild);
	}
	globalCounter = 0;
	contArr = new Array();


	let tmp = {Name:document.getElementById("searchText").value,UserID:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Search.' + extension;
	
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

				for( let i in jsonObject )
				{
					if (i == "error")
					{
						break;
					}
					let resultContact = {Image:jsonObject[""+i][0], Name:jsonObject[""+i][1], Email:jsonObject[""+i][2], Phone:jsonObject[""+i][3], Relation:jsonObject[""+i][4], Alive:jsonObject[""+i][5], ID:jsonObject[""+i][6]};
					console.log(resultContact);
					display(resultContact);
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

function loadOnTable(){
	document.getElementById("loadMore-button").click();
}



