//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for(let button of buttons) {
    button.addEventListener("click", function(){
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    })
  }
//Allows user to press enter instead of clicking submit button
  document.getElementById("answer-box").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  })

  runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the users answer has been processed.
 */
function runGame(gameType) {
//Clear answer box each time
    document.getElementById("answer-box").value = "";
//When page loads, stops user having to click answer box
    document.getElementById("answer-box").focus();
//Creates two random numbers between 1 and 25 (+1 to stop 0 appearing)
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else if (gameType === "subtract") {
    displaySubtractQuestion(num1, num2);
  } else if (gameType === "division") {
    displayDivisionQuestion(num1, num2);
  }
}
/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array.
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
    alert("You got it right!");
    incrementScore();
  } else {
    alert(`You answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}!`);
    incrementWrongAnswer();
  }

  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (numbers) using parseInt (to tell its and integer) and the operator (plus, minus symbol ect)
 * directly from the DOM and returns the correct answer.
 */
function calculateCorrectAnswer() {

  let operand1 = parseInt(document.getElementById('operand1').innerText);
  let operand2 = parseInt(document.getElementById('operand2').innerText);
  let operator = document.getElementById('operator').innerText;

  if (operator === "+") {
      return [operand1 + operand2, "addition"];
    } else if(operator === "x") {
      return [operand1 * operand2, "multiply"];
    } else if(operator === "-") {
      return [operand1 - operand2, "subtract"];
    } else if(operator === "/") {
        return [operand1 / operand2, "division"];
    }
}

/**
 * Gets the current score from the DOM and increments it by one.
 */
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerText = ++oldScore;
}
/**
 * Gets the current incorrect score from the DOM and increments it by one.
 */
function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
  document.getElementById('operand1').textContent = operand1;
  document.getElementById('operand2').textContent = operand2;
  document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
  operand1 = operand1 * operand2;
  
  document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
  document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
  document.getElementById('operator').textContent = "/";
}