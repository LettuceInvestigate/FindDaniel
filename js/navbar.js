function activeClass(fileName) {
    
    document.getElementById("homeButton").changer = "active";
    if (fileName == "index.html") {
        isIndex();
        
    }
    if (fileName == "ourtragedy.html") {
        notIndex();
        document.getElementById("homeButton").className = "active";
        document.getElementById("tragedyButton").className = "active";
        document.getElementById("postersButton").className = "active";
        document.getElementById("loginButton").className = "active";
    }
    if (fileName == "wantedposters.html") {
        notIndex();
        document.getElementById("homeButton").className = "active";
        document.getElementById("tragedyButton").className = "active";
        document.getElementById("postersButton").className = "active";
        document.getElementById("loginButton").className = "active";
    }
    if (fileName == "login.html") {
        notIndex();
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").className = "active";
        document.getElementById("postersButton").className = "active";
        document.getElementById("loginButton").className = "active";
    }
    if (fileName == "register.html") {
        notIndex();
        document.getElementById("homeButton").className = "inactive";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "inactive";
    }
    if (fileName == "dashboard.html") {
        notIndex();
        document.getElementById("homeButton").class = "inactive";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "inactive";
    }
}

function fixTravel(fileName){
    if (fileName == "index.html") {
        isIndex();
    }else if(fileName == "ourtragedy.html" || fileName == "wantedposters.html"
        || fileName == "login.html" || fileName == "register.html" || fileName == "dashboard.html"
        || fileName == "learnmore.html"){
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
    
    document.getElementById("logoutButton").href = "/html/login.html"
}

function notIndex(){
    document.getElementById("homeButton").href = "/../index.html";
    document.getElementById("tragedyButton").href = "ourtragedy.html";
    document.getElementById("postersButton").href = "wantedposters.html"
    document.getElementById("loginButton").href = "login.html";
    
    document.getElementById("logoutButton").href = "login.html"
}

function hoverButton(currentElement){
    if(currentElement = "homeButton"){
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").class = "inactive";
        document.getElementById("postersButton").class = "inactive";
        document.getElementById("loginButton").class = "inactive";
    }
}