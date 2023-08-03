//Write three relevant global variables
let currentOperandText = '';
let previousOperandText = '';
let operationOperand = undefined;

//Extract all relevant data attributes
const dataPreviousOperand = document.querySelector("[data-previous-operand]");
const dataCurrentOperand = document.querySelector("[data-current-operand]");
const dataAllClear = document.querySelector("[data-all-clear]");
const dataDelete = document.querySelector("[data-delete]");
const dataEquals = document.querySelector("[data-equals]");
const dataNumbers = document.querySelectorAll("[data-number]");
const dataOperations = document.querySelectorAll("[data-operation]");

//Clear all records by default
function clear() {
  dataCurrentOperand.textContent = currentOperandText;
  dataPreviousOperand.textContent = previousOperandText;
}

clear();

//Loop over all numbers and add event listeners.
//Create a number function which takes the number and modifes the currentoperandtext to include the number.
//Prevent the decimal from being entered more than once.
//Then update the records using an update display function that should be at the very bottom.
dataNumbers.forEach(numberBtn => {
  numberBtn.addEventListener("click",function () {
    number(numberBtn.textContent);
    updateDisplay();
    

  })
})

function number(num) {
  if(num === "."  && currentOperandText.includes(".")){
    return;
  }
  currentOperandText = currentOperandText.toString() + num.toString();


}

//Loop over the operations and check if the operation button was clicked
//If clicked change the operation global variable, in the operation function
//Set previousOperandText to currentOperandText and set currentOperandText to empty
//And call the update display function.
dataOperations.forEach(operationBtn => {
  operationBtn.addEventListener("click",() => {
    operation(operationBtn.textContent);
    updateDisplay();
  });
})

function operation(operationValue) {
  operationOperand = operationValue.toString();
  previousOperandText = currentOperandText;
  currentOperandText = '';
}



function updateDisplay() {
  dataCurrentOperand.textContent = currentOperandText;
  dataPreviousOperand.textContent = previousOperandText;
}











