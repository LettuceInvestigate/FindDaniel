

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
document.getElementById("numOfUsers").innerHTML = numOfUsers();