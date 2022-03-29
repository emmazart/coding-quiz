// select Start Quiz button
var buttonOriginal = document.querySelector(".btn-start");
// select h2 element that will hold question content
var quizQuestion = document.querySelector("#quiz-question");
// select intro paragraph to dynamically hide
var introP = document.querySelector("#intro-p");
// select button group container
var buttonGroupEl = document.getElementById("button-group");
var quizTimeP = document.getElementById("countdown");
var quizContainer = document.getElementById("quiz-container");

// all questions writted as objects within objects, contain 3 incorrect answers
var questionA = {
    question: 'What is your name?',
    answer: {
        correct: ["Emma"],
        incorrect1: ["Hannah"],
        incorrect2: ["Abby"],
        incorrect3: ["Charlie"]
}};


// while timer > 1 and number of questions < 10

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
        buttonA.className = "btn btn-primary btn-dynamic";
        buttonA.value = answerA[i];
        buttonGroupEl.appendChild(buttonA);
    }

    // var buttonDynamicEl = document.querySelector(".btn-dynamic");  
    // console.log(buttonA.className);  

    // var clickConfirm = function (){
    //     console.log("click");
    // };

    // buttonGroupEl.addEventListener("click", buttonDynamicEl, function(){
    //     console.log("CLICK");
    // });
};

// reference: https://javascript.info/event-delegation
buttonGroupEl.onclick = function(event){
    let target = event.target;
    if (target.className === 'btn btn-primary btn-dynamic'){
        console.log("CLICK");
        console.log(event.target);
    }
    // on click of any button next question loads
    // if previous question is correct (if button value = correct answer)
    // display Correct! with top border
    // else 
    // display Incorrect! with top border 
    // deduct 10 seconds for penalty

};

// check if we have the right answer
console.log(questionA.answer.correct);
// check if equal to the value of the event target?



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