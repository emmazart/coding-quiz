// ---------- DECLARE GLOBAL VARIABLES START ---------- //
var buttonOriginal = document.querySelector(".btn-start"); // select Start Quiz button
var introP = document.querySelector("#intro-p"); // select intro p to hide
var quizQuestion = document.querySelector("#quiz-question"); // select h2 for question content
var buttonGroupEl = document.getElementById("button-group"); // select button group container
var quizTimeP = document.getElementById("countdown"); // where countdown will display
var quizContainer = document.getElementById("quiz-container"); // holds all quiz elements
var ansCorrectEl = document.getElementById("ans-correct");
var ansIncorrectEL = document.getElementById("ans-incorrect");

var numberHighScores = 5;
var highscore = "highscore";
var highscoreHeaderEl = document.getElementById("highscore-header");
var highscoreListEl = document.getElementById("highscore-list");
var currentQuestionIndex = 0; // for manually iterating through quiz aqusetions array

var timeLeft = 75;

var backEl = document.querySelector("#btn-back");
var clearEl = document.getElementById("btn-clear");

// ----------- DECLARE GLOBAL VARIABLES END ---------- //

// ---------- DECLARE QUIZQUESTIONS ARRAY ---------- //
var questionA = {
  question: "What is your name?",
  answer: ["Emma", "Hannah", "Abby", "Charlie"],
  correct: "Emma",
};

let quizQuestionsArr = [
  {
    question: "Commonly used data types do NOT include:",
    answer: ["Numbers", "Alerts", "Booleans", "Strings"],
    correct: "Alerts"
  },
  {
    question: "The condition in an if/else statement is enclosed with ___________.",
    answer: ["Parenthesis", "Curly Brackets", "Square Brackets", "Quotes"],
    correct: "Parenthesis"
  }
];
// ---------- QUIZ QUESTIONS ARRAY ENDS ---------- //

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
  }
};

// ---------- CHECK IF WE NEED TO END THE QUIZ ---------- //
var checkEndQuiz = function() {
    if (currentQuestionIndex === quizQuestionsArr.length){
        endQuiz();
    }
    else if (timeLeft < 1){
        endQuiz();
    }
    else {
        loadQuestion();
    }
};

// ---------- DEFINE END QUIZ FUNCTION ----------- //
var endQuiz = function() {
    var userScore = timeLeft;
    timeLeft = 0;
    buttonGroupEl.innerHTML = ""; // clears buttonGroupEl
    quizQuestion.textContent = "All done!";
    introP.innerHTML = "<p id='intro-p'>Your Final Score is " + userScore + ". <br/> Please enter your initials to save your highscore. </p>";
    introP.style.display = "block"

    // create form inputs for saving high scores
    var inputInitials = document.createElement("input");
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.className = "btn btn-primary";
    submit.style.width = "20%";
    inputInitials.style.width = "60%";
    inputInitials.type = "text";
    inputInitials.id = "input-initials";
    inputInitials.value = "";

    // append & style new input form
    buttonGroupEl.appendChild(inputInitials);
    buttonGroupEl.appendChild(submit);
    buttonGroupEl.style.flexDirection = "row";

    // capture user input
    inputInitials.addEventListener("blur", function(){
    });

    // const newScore = {inputInitials.value, userScore}

    // event listener for submit button
    submit.addEventListener("click", function(event) {
        // set user input and score to local storage
        var userInput = inputInitials.value;
        const newScore = {userInput, userScore}
        console.log(newScore);

        localStorage.setItem(highscore, JSON.stringify(newScore));

    });



//     const newScore = {
//         user: user,
//         score: userScore
//     };

//     // var highscoreKey = "highscore";
//     // add event listener for submit button
//     submit.addEventListener("click", function(event) {
//         localStorage.setItem(highscores, JSON.stringify(newScore));

//         const highScoreString = localStorage.getItem(highScores);
//         const highScores = JSON.parse(highScoreString) ?? [];



        
//     // var listitem = localStorage.getItem('highscore');
//     // console.log(listitem);
//     // localStorage.setItem(highscoreKey, JSON.stringify(inputInitials.value + " " + userScore));
//     // highscoreKey++
//     //also this takes you to the highscore page
//     // location.href = "./highscore.html";

//     // populate high score list
// });
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
function countdown() {
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
}

// ---------- EVENT LISTENERS ---------- //

// event listener for start quiz button
buttonOriginal.addEventListener("click", countdown);

// event listener for hiding & unhiding high scores list
highscoreHeaderEl.addEventListener("click", function () {
  if (highscoreListEl.style.display === "block") {
    highscoreListEl.style.display = "none";
  } else {
    highscoreListEl.style.display = "block";
  }
});