function activeClass(fileName) {
    console.log("MADE IT X2222");
    if (fileName == "index.html") {
        document.getElementById("homeButton").className = "active";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "inactive";
    }
    if (fileName == "ourtragedy.html") {
        document.getElementById("homeButton").className = "inactive";
        document.getElementById("tragedyButton").className = "active";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "inactive";
    }
    if (fileName == "wantedposters.html") {
        document.getElementById("homeButton").className = "inactive";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "active";
        document.getElementById("loginButton").className = "inactive";
    }
    if (fileName == "login.html") {
        document.getElementById("homeButton").className = "inactive";
        document.getElementById("tragedyButton").className = "inactive";
        document.getElementById("postersButton").className = "inactive";
        document.getElementById("loginButton").className = "active";
    }
}
  