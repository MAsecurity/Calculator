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
  currentOperandText = '';
  previousOperandText = '';
  operationOperand = undefined;
}

clear();

//Loop over all numbers and add event listeners.
dataNumbers.forEach(numberBtn => {
  numberBtn.addEventListener("click",function () {
    number(numberBtn.textContent);
    updateDisplay();
    

  })
})
//Create a number function which takes the number and modifes the currentoperandtext to include the number.
//Prevent the decimal from being entered more than once.
//Then update the records using an update display function that should be at the very bottom.
//Check if the currentNumber has been set to cannot divide by 0 and if the user enters a number everything should be cleared.
function number(num) {
  if(num === "."  && currentOperandText.includes(".")){
    return;
  }else if (currentOperandText.includes('Cannot divide by 0')) {
    clear();
    updateDisplay();

  }else{
    currentOperandText = currentOperandText.toString() + num.toString();
  }
}

//Loop over the operations and add event listeneres 
dataOperations.forEach(operationBtn => {
  operationBtn.addEventListener("click",() => {
    operation(operationBtn.textContent);
    updateDisplay();
  });
})
//If clicked change the operation global variable, in the operation function
//Check incase the currentOperandText is empty and if so return nothing, else..
//Set previousOperandText to currentOperandText and set currentOperandText to empty
//And call the update display function.
function operation(operationValue) {
  if (currentOperandText === '') {
    return;
  }
  operationOperand = operationValue.toString();
  previousOperandText = currentOperandText;
  currentOperandText = '';
}

//Add an event listener to the equal button and if clicked call the compute function.
dataEquals.addEventListener("click", () => {
  compute();
  updateDisplay();
  
});

//Check in the compute function if the operation is not equal to null
//Then use switch operators to calculate prev and current values based on given operator
//In the case of divide check for the possible case of dividing by zero and prevent computing it.
function compute() {
  let result;
  if (operationOperand != null) {
    switch(operationOperand) {
      case "/":
        if(previousOperandText === "0" || currentOperandText === "0") {
          result = "Cannot divide by 0";
        }else {
          result = parseFloat(previousOperandText) / parseFloat(currentOperandText);
        }
        break;
      case "*":
        result = parseFloat(previousOperandText) * parseFloat(currentOperandText);
        break;
      case "+":
        result = parseFloat(previousOperandText) + parseFloat(currentOperandText);
        break;
      case "-":
        result = parseFloat(previousOperandText) -  parseFloat(currentOperandText);
        break;
      default:
        return;
    }
  }
  currentOperandText = result.toString()
  previousOperandText = '';
  operationOperand = undefined;


}

// Add an event listener to the all-clear button and clear the records if clicked.
dataAllClear.addEventListener("click", () => {
  clear();
  updateDisplay();
})

// Add an event listener to the delete button and if clicked remove the last character.
dataDelete.addEventListener("click", () => {
  dataDeletefunc();
  updateDisplay();
});
function dataDeletefunc() {
  currentOperandText = currentOperandText.split('').slice(0,-1).join('');
}

function updateDisplay() {
  dataCurrentOperand.textContent = currentOperandText;
  if (operationOperand != null) {
    dataPreviousOperand.textContent = `${previousOperandText} ${operationOperand}`;
  }else {
    dataPreviousOperand.textContent = '';
  }
}











