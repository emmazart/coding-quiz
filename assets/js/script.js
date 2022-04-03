// ---------- DECLARE GLOBAL VARIABLES START ---------- //
var buttonOriginal = document.querySelector(".btn-start"); // select Start Quiz button
var introP = document.querySelector("#intro-p"); // select intro p to hide
var quizQuestion = document.querySelector("#quiz-question"); // select h2 for question content
var buttonGroupEl = document.getElementById("button-group"); // select button group container
var quizTimeP = document.getElementById("countdown"); // where countdown will display
var quizContainer = document.getElementById("quiz-container"); // holds all quiz elements
var ansCorrectEl = document.getElementById("ans-correct");
var ansIncorrectEL = document.getElementById("ans-incorrect");

var highscores = "highscores";
var highscoresArr = [];
var highscoreHeaderEl = document.getElementById("highscore-header");
var highscoreSec = document.getElementById("highscores");
var highscoreListEl = document.getElementById("highscore-list");
var currentQuestionIndex = 0; // for manually iterating through quiz aqusetions array

var timeLeft = 75;
var timerCountdown;

var backEl = document.querySelector("#btn-back");
var clearEl = document.querySelector("#btn-clear");

// ----------- DECLARE GLOBAL VARIABLES END ---------- //

// ---------- DECLARE QUIZQUESTIONS ARRAY ---------- //
var questionA = {
  question: "How do we reference our JavaScript file in HTML?",
  answer: ["<scripting>", "<js>", "<javascript>", "<script>"],
  correct: "<script>",
};

let quizQuestionsArr = [
  {
    question: "Commonly used data types do NOT include:",
    answer: ["Numbers", "Alerts", "Booleans", "Strings"],
    correct: "Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed with ___________.",
    answer: ["Parenthesis", "Curly Brackets", "Square Brackets", "Quotes"],
    correct: "Parenthesis",
  },
  {
    question: "How does a 'for' loop start?",
    answer: ["for (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)"],
    correct: "for (i = 0; i <= 5; i++)",
  },
  {
    question: "How do you add a comment in JavaScript?",
    answer: ["'This is a comment", "<!--This is a comment-->", "//This is a comment", "#This is a comment"],
    correct: "//This is a comment",
  },
  {
    question: "In JavaScript, the following loop will execute ____ times: for (x = 0; x < 10; x++",
    answer: ["9", "10", "11", "cannot tell from this portion of the script"],
    correct: "10",
  },
  {
    question: "In JavaScript, the symbols + - * and / are:",
    answer: ["Operators", "Expressions", "Functions", "Comparison Operators"],
    correct: "Operators",
  },
  {
    question: "The expression x!=y returns false if:",
    answer: ["The variables are equal", "x is less than y", "The variables are not equal", "None of the above"],
    correct: "The variables are equal",
  },
  {
    question: "Alert(message), close(), and reset() are JavaScript ______.",
    answer: ["Objects", "Properties", "Commands", "Methods"],
    correct: "Methods",
  },
  {
    question: "String values must be enclosed within ________ when being assigned to variables.",
    answer: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
    correct: "Quotes",
  }
];
// ---------- QUIZ QUESTIONS ARRAY ENDS ---------- //

// ---------- POPULATE HIGH SCORES LIST ON PAGE LOAD ---------- //
var populateHighscore = function() {
var lsHighscores = JSON.parse(localStorage.getItem("highscores"));

// sort highscores array in descending order
var sorted = lsHighscores.sort();
var reversed = sorted.reverse();

// populate text content of high score list
var scoreOne = document.getElementById("1");
var scoreTwo = document.getElementById("2");
var scoreThree = document.getElementById("3");
var scoreFour = document.getElementById("4");
var scoreFive = document.getElementById("5");

scoreOne.textContent = reversed[0];
scoreTwo.textContent = reversed[1];
scoreThree.textContent = reversed[2];
scoreFour.textContent = reversed[3];
scoreFive.textContent = reversed[4];
}

// ---------- DEFINE LOAD QUESTION TO RUN THROUGH QUIZ QUESTIONS ARRAY ---------- //
var loadQuestion = function () {
  buttonGroupEl.innerHTML = ""; // clears buttonGroupEl
  var currentQuestion = quizQuestionsArr[currentQuestionIndex];

  // set the h2 text content equal to the question being asked
  quizQuestion.textContent = currentQuestion.question;
  var answer = currentQuestion.answer;

  // iterate through answers array to create individual buttons
  for (i = 0; i < 4; i++) {
    var buttons = document.createElement("input");
    buttons.type = "submit";
    buttons.className = "btn btn-primary btn-dynamic";
    buttons.id = [i];
    buttons.value = answer[i];
    buttonGroupEl.appendChild(buttons);
    console.log(buttons);
  }

  // on click event triggers answer validation
  buttonGroupEl.onclick = function (event) {
    let target = event.target;
    if (target.className === "btn btn-primary btn-dynamic") {
      console.log("CLICK");
      // if previous question is correct (if button value = correct answer)
      if (event.target.value === currentQuestion.correct) {
        // display Correct! with top border
        console.log("CORRECT");
        ansCorrectEl.style.display = "block";
        ansIncorrectEL.style.display = "none";
      } else {
        // display Incorrect! with top border
        ansIncorrectEL.style.display = "block";
        ansCorrectEl.style.display = "none";
        // deduct 10 seconds for penalty
        timeLeft = timeLeft - 10;
      }

      // increment currentQuestionIndex by 1
      currentQuestionIndex++;
      // check to see if the quiz is over
      checkEndQuiz();
    }
  };
};

// ---------- CHECK IF WE NEED TO END THE QUIZ ---------- //
var checkEndQuiz = function () {
  if (currentQuestionIndex === quizQuestionsArr.length) {
    endQuiz();
  } else if (timeLeft < 1) {
    endQuiz();
  } else {
    loadQuestion();
  }
};

// ---------- DEFINE END QUIZ FUNCTION ----------- //
var endQuiz = function () {
  var userScore = timeLeft;
  timeLeft = 0;
  buttonGroupEl.innerHTML = ""; // clears buttonGroupEl
  quizQuestion.textContent = "All done!";
  introP.innerHTML = "<p id='intro-p'>Your Final Score is " + userScore + ". <br/> Please enter your initials to save your highscore. </p>";
  introP.style.display = "block";

  // create form inputs for saving high scores
  var inputInitials = document.createElement("input");
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.className = "btn btn-primary";
  submit.style.width = "20%";
  inputInitials.style.width = "60%";
  inputInitials.type = "text";
  inputInitials.id = "input-initials";

  // append & style new input form
  buttonGroupEl.appendChild(inputInitials);
  buttonGroupEl.appendChild(submit);
  buttonGroupEl.style.flexDirection = "row";

  // capture user input
  inputInitials.addEventListener("blur", function () {});

  // event listener for submit button
  submit.addEventListener("click", function (event) {
    // create object to hold new score
    var userInput = inputInitials.value;
    var newScore = userScore + " - " + userInput;
    var scoreListItemElOne = document.getElementById("1");

    // display highscores list & hide other elements
    highscoreSec.className = "d-flex justify-content-center";
    ansCorrectEl.style.display = "none";
    ansIncorrectEL.style.display = "none";
    buttonGroupEl.style.display = "none";

    // check if highscores already exists in local storage
    if (!localStorage.getItem("highscores")) {
      //add new score to new high scores array
      highscoresArr.push(newScore);
      localStorage.setItem(highscores, JSON.stringify(highscoresArr));

      // add new score to highscores page
      scoreListItemElOne.textContent = newScore;
    } else {
      // retrieve current local storage item
      var lsHighscores = JSON.parse(localStorage.getItem("highscores"));
      //add new score to high scores array & send back to local storage
      lsHighscores.push(newScore);
      localStorage.setItem(highscores, JSON.stringify(lsHighscores));

      // sort highscores array in descending order
      var sorted = lsHighscores.sort();
      var reversed = sorted.reverse();

      // populate text content of high score list
      var scoreOne = document.getElementById("1");
      var scoreTwo = document.getElementById("2");
      var scoreThree = document.getElementById("3");
      var scoreFour = document.getElementById("4");
      var scoreFive = document.getElementById("5");

      scoreOne.textContent = reversed[0];
      scoreTwo.textContent = reversed[1];
      scoreThree.textContent = reversed[2];
      scoreFour.textContent = reversed[3];
      scoreFive.textContent = reversed[4];
    }
  });
};

// ---------- FUNCTIONS FOR LOADING & VALIDATING FIRST ANSWER ---------- //
var loadFirstQuestion = function () {
  // load first question
  quizQuestion.textContent = questionA.question;

  // create buttons to hold answers
  var answerA = questionA.answer;

  // iterate through object answer array to create individual buttons
  for (i = 0; i < 4; i++) {
    var buttonA = document.createElement("input");
    buttonA.type = "submit";
    buttonA.className = "btn btn-primary btn-dynamic";
    buttonA.value = answerA[i];
    buttonGroupEl.appendChild(buttonA);
  }

  validateFirstAnswer();
};

// reference: https://javascript.info/event-delegation
var validateFirstAnswer = function () {
  buttonGroupEl.onclick = function (event) {
    let target = event.target;
    if (target.className === "btn btn-primary btn-dynamic") {
      console.log("CLICK");
      // if previous question is correct (if button value = correct answer)
      if (event.target.value === questionA.answer[0]) {
        // display Correct! with top border
        console.log("CORRECT");
        ansCorrectEl.style.display = "block";
      } else {
        // display Incorrect! with top border
        ansIncorrectEL.style.display = "block";
        // deduct 10 seconds for penalty
        timeLeft = timeLeft - 10;
      }

      for (i = 0; i < 4; i++) {
        let buttons = document.getElementsByClassName("btn-dynamic");
        buttons[i].style.display = "none";
      }
      loadQuestion();
    }
  };
};
// ---------- END FIRST QUESTION ---------- //

// ---------- DEFINE COUNTDOWN FUNCTION ---------- //
var timerCountdown = function () {
  // start & display the timer as long as there is time left
  var timeInterval = setInterval(function () {
    if (timeLeft >= 1) {
      quizTimeP.textContent = "Time: " + timeLeft;
      timeLeft--;
    } else {
      quizTimeP.textContent = "Time's Up!";
    }
  }, 1000);

  // hide introP and buttonOriginal
  buttonOriginal.style.display = "none";
  introP.style.display = "none";

  // call loadQuestion function to begin quiz
  loadFirstQuestion();
};

// ---------- EVENT LISTENERS ---------- //

// event listener for start quiz button
buttonOriginal.addEventListener("click", timerCountdown);

// event listener for hiding & unhiding high scores list
highscoreHeaderEl.addEventListener("click", function () {
  console.log("click");
  populateHighscore();
  if (highscoreSec.style.display === "block") {
    highscoreSec.style.display = "none";
    highscoreSec.className = "pt-5";
  } else {
    highscoreSec.style.display = "block";
    highscoreSec.className = "d-flex justify-content-center";
  }
});

// event listener for high scores page "go back"
backEl.onclick = function (event) {
  console.log("click");
  location.href = "./index.html";
};

// event listener for clear high scores
clearEl.onclick = function (event) {
  localStorage.clear();
  highscoreListEl.innerHTML = "";
  let clear = document.getElementById("highscore-clear");
  clear.style.display = "block";
};