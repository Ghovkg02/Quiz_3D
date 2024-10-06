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
        question: 'Where is Sagittarius A* located?',
        choice1: 'In the constellation Orion',
        choice2: 'At the center of the Milky Way galaxy',
        choice3: 'In the Andromeda galaxy',
        choice4: 'In the constellation Cassiopeia',
        answer: 2,  // B) At the center of the Milky Way galaxy
    },
    {
        question: 'What type of astronomical object is Sagittarius A*?',
        choice1: 'Neutron star',
        choice2: 'Supermassive black hole',
        choice3: 'White dwarf',
        choice4: 'Pulsar',
        answer: 2,  // B) Supermassive black hole
    },
    {
        question: 'How was the presence of Sagittarius A* confirmed?',
        choice1: 'By observing a star passing in front of it',
        choice2: "By capturing the black hole's event horizon with the Event Horizon Telescope",
        choice3: 'By detecting gravitational waves',
        choice4: 'By detecting X-rays emitted from its core',
        answer: 2,  // B) By capturing the black hole's event horizon with the Event Horizon Telescope
    },
    {
        question: 'What is the approximate mass of Sagittarius A* compared to the Sun?',
        choice1: '100 times the mass of the Sun',
        choice2: '10,000 times the mass of the Sun',
        choice3: '4 million times the mass of the Sun',
        choice4: '1 billion times the mass of the Sun',
        answer: 3,  // C) 4 million times the mass of the Sun
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






