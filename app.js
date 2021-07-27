//variables

const previousElement = document.querySelector(".previous-display");
const currentElement = document.querySelector(".current-display");

const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const percentButton = document.querySelector(".percent");

const additionButton = document.querySelector(".addition");
const subtractionButton = document.querySelector(".subtraction");
const multiplicationButton = document.querySelector(".multiplication");
const divisionButton = document.querySelector(".division");
const equalButton = document.querySelector(".equal");

const decimalButton = document.querySelector(".decimal");
const number0 = document.querySelector(".number-0");
const number1 = document.querySelector(".number-1");
const number2 = document.querySelector(".number-2");
const number3 = document.querySelector(".number-3");
const number4 = document.querySelector(".number-4");
const number5 = document.querySelector(".number-5");
const number6 = document.querySelector(".number-6");
const number7 = document.querySelector(".number-7");
const number8 = document.querySelector(".number-8");
const number9 = document.querySelector(".number-9");

const numbersArray = [
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
];

let previousOperand = "";
let currentOperand = "";
let operation = undefined;
let temporaryOperand = "";

//functions

function DisplayNumbers() {
  if (operation) {
    previousElement.innerHTML = ` ${previousOperand} ${operation}`;
  } else {
    previousElement.innerHTML = previousOperand;
  }
  currentElement.innerHTML = currentOperand;
}

function AppendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  if (number === 0 && currentOperand === "0") return;

  currentOperand += number;
  DisplayNumbers();
}

function ChooseOperation(selectedOperation) {
  if (temporaryOperand) {
    previousOperand = temporaryOperand.toString();
    currentOperand = "";
    temporaryOperand = "";
    operation = selectedOperation;
    DisplayNumbers();
    return;
  }

  operation = selectedOperation;
  previousOperand = currentOperand;
  acButton.innerHTML = "AC";
  currentOperand = "";
  DisplayNumbers();
}

function Compute() {
  let computation;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "÷":
      computation = previous / current;
      break;

    default:
      return;
  }

  currentOperand = computation;
  previousOperand = "";
  operation = undefined;

  DisplayNumbers();
  temporaryOperand = currentOperand;
  currentOperand = "";
}

function AllClear() {
  if (!currentOperand) {
    currentOperand = currentOperand.slice(0, currentOperand.length - 1);
  } else {
    previousOperand = "";
    currentOperand = "";
    operation = undefined;
    acButton.innerHTML = "AC";
  }

  DisplayNumbers();
}

function PlusMinus() {
  currentOperand = currentOperand * -1;
  DisplayNumbers();
}

function Percent() {
  currentOperand = currentOperand / 100;
  DisplayNumbers();
}

//operator buttons

additionButton.addEventListener("click", () => {
  ChooseOperation("+");
});
subtractionButton.addEventListener("click", () => {
  ChooseOperation("-");
});
multiplicationButton.addEventListener("click", () => {
  ChooseOperation("*");
});
divisionButton.addEventListener("click", () => {
  ChooseOperation("÷");
});
equalButton.addEventListener("click", () => {
  Compute();
});

acButton.addEventListener("click", () => {
  AllClear();
});
pmButton.addEventListener("click", () => {
  PlusMinus();
});
percentButton.addEventListener("click", () => {
  Percent();
});

for (let i = 0; i < numbersArray.length; i++) {
  const number = numbersArray[i];

  number.addEventListener("click", () => {
    console.log("Number : ", i);
    AppendNumber(i);
    temporaryOperand = "";
  });
}

decimalButton.addEventListener("click", () => {
  AppendNumber(".");
});
