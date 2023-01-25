function activeClass(fileName) {
    if (fileName == "index.html") {
        isIndex();
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").class = "active";
        document.getElementById("postersButton").class = "active";
        document.getElementById("loginButton").class = "active";
    }
    if (fileName == "ourtragedy.html") {
        notIndex();
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").class = "active";
        document.getElementById("postersButton").class = "active";
        document.getElementById("loginButton").class = "active";
    }
    if (fileName == "wantedposters.html") {
        notIndex();
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").class = "active";
        document.getElementById("postersButton").class = "active";
        document.getElementById("loginButton").class = "active";
    }
    if (fileName == "login.html") {
        notIndex();
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").class = "active";
        document.getElementById("postersButton").class = "active";
        document.getElementById("loginButton").class = "active";
    }
}

function fixTravel(fileName){
    if (fileName == "index.html") {
        isIndex();
    }else if(fileName == "ourtragedy.html" || fileName == "wantedposters.html" || fileName == "login.html" || fileName == "register.html"){
        notIndex();
    }else{
        console.error("JS: FixTravel Function: NavBar: Reached Illegal Page!")
    }
}

function isIndex(){
    document.getElementById("homeButton").href = "index.html";
    document.getElementById("tragedyButton").href = "/html/ourtragedy.html";
    document.getElementById("postersButton").href = "/html/wantedposters.html"
    document.getElementById("loginButton").href = "/html/login.html";
}

function notIndex(){
    document.getElementById("homeButton").href = "/../index.html";
    document.getElementById("tragedyButton").href = "ourtragedy.html";
    document.getElementById("postersButton").href = "wantedposters.html"
    document.getElementById("loginButton").href = "login.html";
}

function hoverButton(currentElement){
    if(currentElement = "homeButton"){
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").class = "inactive";
        document.getElementById("postersButton").class = "inactive";
        document.getElementById("loginButton").class = "inactive";
    }
}