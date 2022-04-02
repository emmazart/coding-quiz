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

//  // add new score to highscores page
// scoreListItemEl.textContent = "newScore";
// highscoreListEl.appendChild(scoreListItemEl);


