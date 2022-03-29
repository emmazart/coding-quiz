// select Start Quiz button
var buttonOriginal = document.querySelector(".btn-start");
// select h2 element that will hold question content
var quizQuestion = document.querySelector("#quiz-question");
// select intro paragraph to dynamically hide
var introP = document.querySelector("#intro-p");
// select button group container
var buttonGroup = document.querySelector("#button-group");
var quizTimeP = document.getElementById("countdown");
var quizContainer = document.getElementById("quiz-container");

// write quiz questions as nested objects
// var questionA = {
//     question: 'What is your name?',
//     answer: {
//         correct: 'Emma',
//         incorrect: 'Hannah'    
//     }
// };

var questionA = {
    question: 'What is your name?',
    answer: {
        correct: ["Emma"],
        incorrect1: ["Hannah"],
        incorrect2: ["Abby"],
        incorrect3: ["Charlie"]
}};



var loadQuestion = function() {
    // load first question
    quizQuestion.textContent = questionA.question;

    // create buttons to hold answers
    var questionALength = 4;
    var answerA = questionA.answer.correct;
    answerA.push(questionA.answer.incorrect1, questionA.answer.incorrect2, questionA.answer.incorrect3);

    for (i = 0; i < questionALength; i++){
        var buttonA = document.createElement("input");
        buttonA.type = "submit";
        buttonA.className = "btn btn-primary";
        buttonA.value = answerA[i];
        buttonGroup.appendChild(buttonA);
    }
};

// while timer > 1 and number of questions < 10 (or whatever)

// on click of any button, next question loads
// if previous question is right (if button value = correct answer)
// display Correct! with top border
// else 
// display Incorrect! with top border 
// deduct 10 seconds for penalty

//use localstorage to log highscores

// define countdown function
function countdown () {
    var timeLeft = 75;

    var timeInterval = setInterval(function() {
        if (timeLeft >= 1) {
            quizTimeP.textContent = 'Time: ' + timeLeft;
            timeLeft--;
        }
        else {
            quizTimeP.textContent = "Time's Up!";
        }
}, 1000)

    // hide introP and buttonOriginal
    buttonOriginal.style.display = "none";
    introP.style.display = "none";

    loadQuestion();
};

// on click of start button, run countdown function
buttonOriginal.addEventListener("click", countdown);