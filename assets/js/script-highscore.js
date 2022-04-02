// event listener for high scores page "go back"
backEl.onclick = function(event) {
    console.log("click");
    location.href = "./index.html";
};

// event listener for clear high scores
clearEl.onClick = function(event) {
    localStorage.clear();
    highscoreListEl.innerHTML = ""; // clears highscoreListEl
};

