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
var ansCorrectEl = document.getElementById("ans-correct");
var ansIncorrectEL = document.getElementById("ans-incorrect");

var timeLeft = 75;

// all questions written as objects within objects, contain 3 incorrect answers

var questionA = {
    question: 'What is your name?',
    answer: ["Emma", "Hannah", "Abby", "Charlie"]
};

let quizQuestionsArr = [
    {
    question: 'Commonly used data types do NOT include:',
    answer: ["Alerts", "Numbers", "Booleans", "Strings"]
},
{
    question: 'The condition in an if/else statement is enclosed with ___________.',
    answer: ["Parenthesis", "Curly Brackets", "Square Brackets", "Quotes"]
}
];

console.log(quizQuestionsArr[0].answer[0]);
console.log(quizQuestionsArr[0].answer);
console.log(quizQuestionsArr[0].question);

// TRANSLATE FROM QUESTIONA TO QUIZQUESTIONS VARIABLE
var loadQuestion = function() {
    for (i = 0; i < quizQuestionsArr.length; i++){

        // set the h2 text content equal to the question being asked
        quizQuestion.textContent = quizQuestionsArr[i].question;
        var answer = quizQuestionsArr[i].answer;

        // iterate through answers array to create individual buttons
        for (i = 0; i < 4; i++){
            var buttons = document.createElement("input");
            buttons.type = "submit";
            buttons.className = "btn btn-primary btn-dynamic";
            buttons.id = [i];
            buttons.value = answer[i];
            buttonGroupEl.appendChild(buttons);
            console.log(buttons);
        }

        var validateAnswer = function() {

            buttonGroupEl.onclick = function(event){
                let target = event.target;
                if (target.className === 'btn btn-primary btn-dynamic'){
                    console.log("CLICK");
                    // if previous question is correct (if button value = correct answer)
                    if (event.target.value === answer[0]){
                        // display Correct! with top border
                        console.log("CORRECT")
                        ansCorrectEl.style.display = "block";
                    } 
                    else {
                        // display Incorrect! with top border 
                        ansIncorrectEL.style.display = "block";
                        // deduct 10 seconds for penalty
                        timeLeft = (timeLeft - 10);
                    }
        
                    for (i = 0; i < 4; i++) {
                        let buttons = document.getElementsByClassName("btn-dynamic");
                        buttons[i].style.display = "none";
                    }
                    loadQuestion();
                }
            }
        };
        
        validateAnswer();
    }
}

// reference: https://javascript.info/event-delegation
// var validateAnswer = function() {

//     buttonGroupEl.onclick = function(event){
//         let target = event.target;
//         if (target.className === 'btn btn-primary btn-dynamic'){
//             console.log("CLICK");
//             console.log(quizQuestionsArr[i]);
//             // if previous question is correct (if button value = correct answer)
//             if (event.target.value === answer[0]){
//                 // display Correct! with top border
//                 console.log("CORRECT")
//                 ansCorrectEl.style.display = "block";
//             } 
//             else {
//                 // display Incorrect! with top border 
//                 ansIncorrectEL.style.display = "block";
//                 // deduct 10 seconds for penalty
//                 timeLeft = (timeLeft - 10);
//             }

//             for (i = 0; i < 4; i++) {
//                 let buttons = document.getElementsByClassName("btn-dynamic");
//                 buttons[i].style.display = "none";
//             }
//             loadQuestion();
//         }
//     }
// };


// while timer > 1 and number of questions < 10

var loadFirstQuestion = function() {
    // load first question
    quizQuestion.textContent = questionA.question;

    // create buttons to hold answers
    var answerA = questionA.answer;

    // iterate through object answer array to create individual buttons
    for (i = 0; i < 4; i++){
        var buttonA = document.createElement("input");
        buttonA.type = "submit";
        buttonA.className = "btn btn-primary btn-dynamic";
        buttonA.value = answerA[i];
        buttonGroupEl.appendChild(buttonA);        
    }
    validateFirstAnswer();
};

// reference: https://javascript.info/event-delegation
var validateFirstAnswer = function() {

    buttonGroupEl.onclick = function(event){
        let target = event.target;
        if (target.className === 'btn btn-primary btn-dynamic'){
            console.log("CLICK");
            // if previous question is correct (if button value = correct answer)
            if (event.target.value === questionA.answer[0]){
                // display Correct! with top border
                console.log("CORRECT")
                ansCorrectEl.style.display = "block";
            } 
            else {
                // display Incorrect! with top border 
                ansIncorrectEL.style.display = "block";
                // deduct 10 seconds for penalty
                timeLeft = (timeLeft - 10);
            }

            for (i = 0; i < 4; i++) {
                let buttons = document.getElementsByClassName("btn-dynamic");
                buttons[i].style.display = "none";
            }
            loadQuestion();
        }
    }
};

//use localstorage to log highscores

// define countdown function
function countdown () {
    // start & display the timer as long as there is time left
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

    // call loadQuestion function to begin quiz
    loadFirstQuestion();
};

// on click of start button, run countdown function
buttonOriginal.addEventListener("click", countdown);