const container = document.querySelector('#container');
const form = document.querySelector('#form_api');
const home = document.querySelector('#home');

const qContainer = document.querySelector('#question_container');
const resultsScore = document.querySelector('#results_score');

/* Variables to fill */
let questions;
let q = 0;
let score = 0;

let correctAnswer;
/* ---------------->end. */

window.addEventListener('load', () => {
  form.addEventListener('submit', startGame);
});

function startGame(e) {
  e.preventDefault();

  const amount = document.querySelector('#trivia_amount').value;
  const category = document.querySelector('#trivia_category').value;
  const difficulty = document.querySelector('#trivia_difficulty').value;
  const type = document.querySelector('#trivia_type').value;

  console.log(amount);
  console.log(category);
  console.log(difficulty);
  console.log(type);

  //Consult the API Trivia
  callAPI(amount, category, difficulty, type);
}

/* Function to request information from the API */
function callAPI(amount, category, difficulty, type) {
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => fillQuestions(result.results))
    .catch((error) => console.log(error));
}

const fillQuestions = (questionsAPI) => {
  questions = questionsAPI;

  console.log(questions);
  showQuestions();
};

const showQuestions = () => {
  correctAnswer = questions[q].correct_answer;
  console.log(correctAnswer);

  if (questions[q].incorrect_answers.length > 1) {
    container.style.display = 'none';

    qContainer.innerHTML = `
    <div class="container questions_js">
      <h3 class="title_questions">${questions[q].question}</h3>
      <ul class="flex questions_list">
      <li><button class="q_js" onClick="checkAnswer(this)">${questions[q].correct_answer}</button></li>
      <li><button class="q_js" onClick="checkAnswer(this)">${questions[q].incorrect_answers[0]}</button></li>
      <li><button class="q_js" onClick="checkAnswer(this)">${questions[q].incorrect_answers[1]}</button></li>
      <li><button class="q_js" onClick="checkAnswer(this)">${questions[q].incorrect_answers[2]}</button></li>
      </ul>
    </div>
    `;
  } else {
    container.style.display = 'none';
    qContainer.innerHTML = `
    <div class="container questions_js">
    <h3 class="title_questions">${questions[q].question}</h3>
    <ul class="flex questions_list">
    <li><button class="q_js" onClick="checkAnswer(this)">${questions[q].correct_answer}</button></li>
    <li><button class="q_js" onClick="checkAnswer(this)">${questions[q].incorrect_answers[0]}</button></li>
    </ul>
    </div>
    `;
  }
};

const checkAnswer = (button) => {
  if (button.innerText === correctAnswer) {
    score++;
    console.log('Correct');
  } else {
    console.log('Incorrect');
  }

  if (questions.length - 1 !== q) {
    q++;
    showQuestions();
  } else {
    qContainer.style.display = 'none';
    resultsScore.innerHTML = `
    <div class="results_score container">
    <h2>Well the game ends here!</h2>
    <h3>Your score is ${score} / ${questions.length} <i class="fas fa-thumbs-up"></i></h3>
    <a href="javascript:location.reload()" class="end_game">Home</a>
    </div>

    `;
  }
};
