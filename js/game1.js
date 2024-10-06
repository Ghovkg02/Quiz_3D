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
    // Same questions as before
    {
        question: 'What is Earendel?',
        choice1: 'A newly discovered planet',
        choice2: 'A black hole near Earth',
        choice3: 'The most distant star ever detected',
        choice4: 'A supernova remnant',
        answer: 3,  // C) The most distant star ever detected
    },
    {
        question: 'How was Earendel detected?',
        choice1: 'By measuring radio signals from the star',
        choice2: 'Through gravitational lensing by a galaxy cluster',
        choice3: 'By tracking cosmic ray interactions',
        choice4: 'By its X-ray emissions',
        answer: 2,  // B) Through gravitational lensing by a galaxy cluster
    },
    {
        question: 'Which space telescope provided detailed observations of Earendel after its discovery?',
        choice1: 'Chandra X-ray Observatory',
        choice2: 'James Webb Space Telescope (JWST)',
        choice3: 'Spitzer Space Telescope',
        choice4: 'Kepler Space Telescope',
        answer: 2,  // B) James Webb Space Telescope (JWST)
    },
    {
        question: 'What makes scientists believe Earendel might be a binary star system?',
        choice1: 'Two stars with different temperatures may be present in the system.',
        choice2: 'The star is unusually dim for its distance.',
        choice3: 'The star\'s light shows periodic dimming.',
        choice4: 'It orbits a black hole in the galaxy cluster.',
        answer: 1,  // A) Two stars with different temperatures may be present in the system.
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
