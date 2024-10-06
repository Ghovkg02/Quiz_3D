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
        question: 'What type of exoplanet is HIP 65426 b?',
        choice1: 'Rocky planet',
        choice2: 'Ice giant',
        choice3: 'Gas giant',
        choice4: 'Terrestrial planet',
        answer: 3,  // C) Gas giant
    },
    {
        question: 'How old is HIP 65426 b compared to Earth?',
        choice1: '100 million years',
        choice2: '500 million years',
        choice3: '15-20 million years',
        choice4: '1 billion years',
        answer: 3,  // C) 15-20 million years
    },
    {
        question: 'Which telescope first captured an image of HIP 65426 b?',
        choice1: 'Hubble Space Telescope',
        choice2: 'Very Large Telescope (VLT)',
        choice3: 'Kepler Space Telescope',
        choice4: 'Spitzer Space Telescope',
        answer: 2,  // B) Very Large Telescope (VLT)
    },
    {
        question: 'What is the estimated temperature of HIP 65426 b?',
        choice1: '500 K',
        choice2: '1282 K',
        choice3: '2000 K',
        choice4: '300 K',
        answer: 2,  // B) 1282 K
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



