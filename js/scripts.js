// Declaring Variables
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Questions
const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    },
]

// Replace quizz to the first question
function init() {
    // create the first question
    createQuestion(0);
}

// Create a question
function createQuestion(i) {

    // Clear the previous question
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // Change the question text
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Insert options
    questions[i].answers.forEach(function(answer, i) {

        // Make the template for quizz's button
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remove hide and template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Show the option on screen
        answersBox.appendChild(answerTemplate);

        // Insert an click event on button
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });

    });

    // Incrementing the question's number
    actualQuestion++;

}

// Checking user's answer
function checkAnswer(btn) {

    // selecting all buttons
    const buttons = answersBox.querySelectorAll("button");

    // check whether the answer is correct, so adding classes on buttons
    buttons.forEach(function(button) {

        if (button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            // check whether the user is correct
            if (btn === button) {
                // increment points
                points++;
            }

        } else {

            button.classList.add("wrong-answer");

        }

    });

    // Show the next question
    nextQuestion();

}

// Show the next quizz's question
function nextQuestion() {

    // timer para usuário ver as respostas
    setTimeout(function() {

        // check if there are more questions
        if (actualQuestion >= questions.length) {
            // show a success message 
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 1000);

}

// Show the final window
function showSuccessMessage() {

    hideOrShowQuizz();

    // change the success data window

    // calc score
    const score = ((points / questions.length) * 100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    // change the number of correct answers
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // change total questions
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;

}

// Show or hide score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Restart Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {

    // clean the points and questions
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

});

// Initializing the Quizz
init();