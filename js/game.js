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
        question: 'What type of stars make up the WR 140 system?',
        choice1: 'Twowhite dwarfs',
        choice2: 'A Wolf-Rayet star and an O-type star',
        choice3: 'A redgiant and a neutron star',
        choice4: 'Two black holes',
        answer: 2,
    },

    {
        question: 'What happens when the two stars in WR 140 come close to each other in their orbit?',
        choice1: 'They collide and merge into one star.',
        choice2: 'They produce intense X-ray and infrared emissions due to wind collision.',
        choice3: 'They explode in a supernova.',
        choice4: 'They both stop emitting light for a brief period.',
        answer: 2,
    },
    {
        question: 'How often does WR 140s "firework show" of dust and energy emissions occur?',
        choice1: 'Every 2 years',
        choice2: 'Every 7.94 years',
        choice3: 'Every 12 years',
        choice4: 'Every 20 years',
        answer: 2,
    }, 
    {
        question: "Why is WR 140 significant for astronomers?",
        choice1: 'It is the closest star system to Earth.',
        choice2: 'It provides insights into mass loss in massive stars and binary star interactions.',
        choice3: 'It is the brightest star in the galaxy.',
        choice4: 'It hosts several exoplanets that are habitable.',
        answer: 2,
    },
]


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



