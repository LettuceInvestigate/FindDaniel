function activeClass(fileName) {
    if (fileName == "index.html") {
        document.getElementById("homeButton").className = "active";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "inactive";
        isIndex();

    }
    if (fileName == "ourtragedy.html") {
        document.getElementById("homeButton").className = "inactive";
        document.getElementById("tragedyButton").className = "active";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "inactive";
        notIndex();
    }
    if (fileName == "wantedposters.html") {
        document.getElementById("homeButton").className = "inactive";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "active";
        document.getElementById("loginButton").className = "inactive";
        notIndex();
    }
    if (fileName == "login.html") {
        document.getElementById("homeButton").className = "inactive";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "active";
        notIndex();
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