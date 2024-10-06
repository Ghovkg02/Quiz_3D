const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Check the current level from localStorage
let currentLevel = localStorage.getItem('currentLevel') || 1;
currentLevel = parseInt(currentLevel); // Ensure it's a number

let questions = [
    {
        question: 'Where is the Carina Nebula located?',
        choice1: 'In the constellation Orion',
        choice2: 'In the constellation Carina',
        choice3: 'In the constellation Andromeda',
        choice4: 'In the constellation Sagittarius',
        answer: 2,  // B) In the constellation Carina
    },
    {
        question: 'What makes the Carina Nebula significant in terms of size?',
        choice1: 'It is the smallest nebula visible from Earth.',
        choice2: 'It is four times larger than the Orion Nebula.',
        choice3: 'It is the only nebula visible to the naked eye.',
        choice4: 'It is the closest nebula to Earth.',
        answer: 2,  // B) It is four times larger than the Orion Nebula
    },
    {
        question: 'Which famous star is located within the Carina Nebula?',
        choice1: 'Betelgeuse',
        choice2: 'Sirius',
        choice3: 'Eta Carinae',
        choice4: 'Proxima Centauri',
        answer: 3,  // C) Eta Carinae
    },
    {
        question: 'What key process occurs in the Carina Nebula?',
        choice1: 'Formation of black holes',
        choice2: 'Destruction of galaxies',
        choice3: 'Star formation from gas and dust',
        choice4: 'Supernova explosions',
        answer: 3,  // C) Star formation from gas and dust
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;
const MIN_SCORE_TO_PASS = 200; // User must score at least 200 to pass to next level

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        // Check if user can progress to the next level
        if (score >= MIN_SCORE_TO_PASS) {
            currentLevel++;
            localStorage.setItem('currentLevel', currentLevel);
        }

        return window.location.assign('/end.html'); // You can change this URL
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();




