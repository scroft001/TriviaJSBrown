import { shuffle, makeElement } from "/utilities.js";

let amountCorrect = 0;
let amountAnswered = 0;

document.querySelector("button").onclick = getQuestions;

function getQuestions() {
  let category = document.querySelector("#categories").value;
  fetch("https://opentdb.com/api.php?amount=5&category=" + category)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      createQuiz(data);
    });
}

function createQuiz(data) {
  //second video
  resetQuiz();
  //end
  data.results.forEach(function (question, index) {
    buildQuestion(question, index, data);
  });
}

function buildQuestion(question, index, data) {
  let questionContainer = makeElement("div", "qcontainer");
  let questionText = makeElement("h2", undefined, question.question);
  let answersContainer = makeElement("div", "answers");
  let answersArray = question.incorrect_answers;
  answersArray.push(question.correct_answer);
  // let answersArray = [question.correct_answer].concat(
  //   question.incorrect_answers
  // );
  answersArray = shuffle(answersArray);

  answersArray.forEach(function (answer) {
    let newAnswer = makeElement("div", "answer", answer);
    newAnswer.onclick = function () {
      checkAnswer(newAnswer, index, data);
    };
    answersContainer.append(newAnswer);
  });

  questionContainer.append(questionText);
  questionContainer.append(answersContainer);

  document.getElementById("quiz").append(questionContainer);
}

function checkAnswer(answer, index, data) {
  amountAnswered++;
  let parent = answer.parentNode;
  parent.style.pointerEvents = "none";

  if (data.results[index].correct_answer === answer.innerHTML) {
    answer.style.backgroundColor = "green";
    amountCorrect++;
  } else {
    answer.style.backgroundColor = "red";
  }

  if (amountAnswered >= data.results.length) {
    let correct = document.getElementById("correct");
    correct.innerHTML = "You got " + amountCorrect + " correct!";

    data.results.forEach(function (question) {
      document
        .getElementById("correctAnswers")
        .append(makeElement("p", undefined, question.correct_answer));
    });
  }
}

function resetQuiz() {
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("correct").innerHTML = "";
  document.getElementById("correctAnswers").innerHTML = "";
  amountAnswered = 0;
  amountCorrect = 0;
}