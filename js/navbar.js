var url = window.location.pathname;
var file = url.substring(url.lastIndexOf('/')+1);
if(file == "index.html"){
    document.getElementById("homeButton").className = "active";
    document.getElementById("tragedyButton").className = "inactive";
    document.getElementById("postersButton").className = "inactive"
    document.getElementById("loginButton").className = "inactive";
    document.getElementById("dashboardButton").className = "inactive";
    document.getElementById("logoutButton").className = "inactive";
}else if(file == "ourtragedy.html"){
    document.getElementById("homeButton").className = "inactive";
    document.getElementById("tragedyButton").className = "active";
    document.getElementById("postersButton").className = "inactive"
    document.getElementById("loginButton").className = "inactive";
    document.getElementById("dashboardButton").className = "inactive";
    document.getElementById("logoutButton").className = "inactive";
}else if(file == "wantedposters.html"){
    document.getElementById("homeButton").className = "inactive";
    document.getElementById("tragedyButton").className = "inactive";
    document.getElementById("postersButton").className = "active"
    document.getElementById("loginButton").className = "inactive";
    document.getElementById("dashboardButton").className = "inactive";
    document.getElementById("logoutButton").className = "inactive";
}else if(file == "login.html"){
    document.getElementById("homeButton").className = "inactive";
    document.getElementById("tragedyButton").className = "inactive";
    document.getElementById("postersButton").className = "inactive"
    document.getElementById("loginButton").className = "active";
    document.getElementById("dashboardButton").className = "inactive";
    document.getElementById("logoutButton").className = "inactive";
}else if(file == "register.html"){
    document.getElementById("homeButton").className = "inactive";
    document.getElementById("tragedyButton").className = "inactive";
    document.getElementById("postersButton").className = "inactive"
    document.getElementById("loginButton").className = "active";
    document.getElementById("dashboardButton").className = "inactive";
    document.getElementById("logoutButton").className = "inactive";
}else if(file == "dashboard.html"){
    document.getElementById("homeButton").className = "inactive";
    document.getElementById("tragedyButton").className = "inactive";
    document.getElementById("postersButton").className = "inactive"
    document.getElementById("loginButton").className = "inactive";
    document.getElementById("dashboardButton").className = "active";
    document.getElementById("logoutButton").className = "inactive";
}else{
    document.getElementById("homeButton").className = "inactive";
    document.getElementById("tragedyButton").className = "inactive";
    document.getElementById("postersButton").className = "inactive"
    document.getElementById("loginButton").className = "inactive";
    document.getElementById("dashboardButton").className = "inactive";
    document.getElementById("logoutButton").className = "inactive";
}

function fixTravel(fileName){
    if (fileName == "index.html") {
        isIndex();
    }else if(fileName == "ourtragedy.html" || fileName == "wantedposters.html"
        || fileName == "login.html" || fileName == "register.html" || fileName == "dashboard.html"
        || fileName == "learnmore.html" || fileName == "warning.html"){
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
    document.getElementById("dashboardButton").href = "/html/dashboard.html";
    document.getElementById("logoutButton").href = "index.html";
}

function notIndex(){
    document.getElementById("homeButton").href = "/../index.html";
    document.getElementById("tragedyButton").href = "ourtragedy.html";
    document.getElementById("postersButton").href = "wantedposters.html"
    document.getElementById("loginButton").href = "login.html";
    document.getElementById("dashboardButton").href = "dashboard.html";
    document.getElementById("logoutButton").href = "/../index.html";
}

function activeButton(currentElement){
    if(currentElement = "homeButton"){
        document.getElementById("homeButton").class = "active";
        document.getElementById("tragedyButton").class = "inactive";
        document.getElementById("postersButton").class = "inactive";
        document.getElementById("loginButton").class = "inactive";
        document.getElementById("dashboardButton").class = "inactive";
        document.getElementById("logoutButton").class = "inactive";
    }
    if(currentElement = "tragedyButton"){
        document.getElementById("homeButton").class = "inactive";
        document.getElementById("tragedyButton").class = "active";
        document.getElementById("postersButton").class = "inactive";
        document.getElementById("loginButton").class = "inactive";
        document.getElementById("dashboardButton").class = "inactive";
        document.getElementById("logoutButton").class = "inactive";
    }
    if(currentElement = "postersButton"){
        document.getElementById("homeButton").class = "inactive";
        document.getElementById("tragedyButton").class = "inactive";
        document.getElementById("postersButton").class = "active";
        document.getElementById("loginButton").class = "inactive";
        document.getElementById("dashboardButton").class = "inactive";
        document.getElementById("logoutButton").class = "inactive";
    }
    if(currentElement = "loginButton"){
        document.getElementById("homeButton").class = "inactive";
        document.getElementById("tragedyButton").class = "inactive";
        document.getElementById("postersButton").class = "inactive";
        document.getElementById("loginButton").class = "active";
        document.getElementById("dashboardButton").class = "inactive";
        document.getElementById("logoutButton").class = "inactive";
    }
    if(currentElement = "dashboardButton"){
        document.getElementById("homeButton").class = "inactive";
        document.getElementById("tragedyButton").class = "inactive";
        document.getElementById("postersButton").class = "inactive";
        document.getElementById("loginButton").class = "inactive";
        document.getElementById("dashboardButton").class = "active";
        document.getElementById("logoutButton").class = "inactive";
    }
}
