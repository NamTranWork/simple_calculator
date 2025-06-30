function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) {
        return "Cannot divide by 0";
    }
    return a / b;
}

function operate(operator, op1, op2) {
    let result;
    switch (operator) {
        case "+":
            result = add(op1, op2);
            break;
        case "-":
            result = subtract(op1, op2);
            break;
        case "*":
            result = multiply(op1, op2);
            break;
        case "/":
            result = divide(op1, op2);
            break;
        default:
            result = op2;
    }

    // Handle divide-by-zero string case
    if (typeof result === "number") {
        // Round to 3 decimal places
        return Math.round(result * 1000) / 1000;
    }
    return result;
}


function handleClear() {
    relMessage.textContent = "0";
    histMessage.textContent = "";
    total = 0;
    operator = "=";
    restart = false;
}

function handleDelete() {
    if (restart === true) {
        operator = "=";
        histMessage.textContent = "";
        restart = false;
    }
    else if (relMessage.textContent.length === 1) {
        relMessage.textContent = "0";
    } else {
        relMessage.textContent = relMessage.textContent.slice(0, -1);
    }
}

function handleEqual() {
    let operand1 = total
    if (restart === false) {
        operand2 = +(relMessage.textContent);
    }
    total = operate(operator, operand1, operand2);

    if (total === "Cannot divide by 0") {
        alert("Cannot divide by 0");
        handleClear();
    } else {
        if (operator === "=") {
            histMessage.textContent = `${operand1} =`;
        } else {
            histMessage.textContent = `${operand1} ${operator} ${operand2} =`;
        }
        relMessage.textContent = total;
        holdValue = true;
        numLock = true;
        restart = true;
    }
}

function handleOperator(oper) {
    operand2 = +(relMessage.textContent);
    restart = false;
    if (holdValue === false) {
        total = operate(operator, total, operand2);
        holdValue = true;
        numLock = true;
    }
    switch (oper) {
        case "+":
            operator = "+";
            break;
        case "-":
            operator = "-";
            break;
        case "*":
            operator = "*";
            break;
        case "/":
            operator = "/";
            break;
    }

    if (total === "Cannot divide by 0") {
        alert("Cannot divide by 0");
        handleClear();
    } else {
        histMessage.textContent = `${total} ${operator}`;
        relMessage.textContent = `${total}`;
    }
}

function handleNumber(stringNum) {
    if (restart === true) {
        handleClear();
    }

    if (relMessage.textContent === "0") {
        if (stringNum === "0") {
            relMessage.textContent = "0";
        } else {
            relMessage.textContent = stringNum;
        }
    } else {
        if (numLock === true) {
            relMessage.textContent = stringNum;
            numLock = false;
        } else if (relMessage.textContent.length < 13) {
            relMessage.textContent += stringNum;
        }
    }
    holdValue = false;
    restart = false;
}

function handleDot() {
    if (!relMessage.textContent.includes(".")) {
        relMessage.textContent += "."
    }
}

// Display elements
const histMessage = document.querySelector("#entryText");
const relMessage = document.querySelector("#resultText");

// Control buttons
const clearButton = document.querySelector("#clearButton");
const deleteButton = document.querySelector("#deleteButton");
const equalButton = document.querySelector("#equalButton");
const dotButton = document.querySelector("#dotButton");

// Operator buttons
const addButton = document.querySelector("#addButton");
const subtractButton = document.querySelector("#subtractButton");
const multiplyButton = document.querySelector("#multiplyButton");
const divideButton = document.querySelector("#divideButton");

// Number buttons
const zeroButton = document.querySelector("#zeroButton");
const oneButton = document.querySelector("#oneButton");
const twoButton = document.querySelector("#twoButton");
const threeButton = document.querySelector("#threeButton");
const fourButton = document.querySelector("#fourButton");
const fiveButton = document.querySelector("#fiveButton");
const sixButton = document.querySelector("#sixButton");
const sevenButton = document.querySelector("#sevenButton");
const eightButton = document.querySelector("#eightButton");
const nineButton = document.querySelector("#nineButton");

// Global variables
let operator = "=";
let operand2 = null;
let total = 0;
let holdValue = true;
let numLock = false;
let restart = false;

// Control event handlers
clearButton.addEventListener("click", () => handleClear());
deleteButton.addEventListener("click",() => handleDelete());
dotButton.addEventListener("click", () => handleDot());
equalButton.addEventListener("click", () => handleEqual());

// Operator event handlers
addButton.addEventListener("click", () => handleOperator("+"));
subtractButton.addEventListener("click", () => handleOperator("-"));
multiplyButton.addEventListener("click", () => handleOperator("*"));
divideButton.addEventListener("click", () => handleOperator("/"))

// Number event handlers
zeroButton.addEventListener("click", () => handleNumber("0"));
oneButton.addEventListener("click", () => handleNumber("1"));
twoButton.addEventListener("click", () => handleNumber("2"));
threeButton.addEventListener("click", () => handleNumber("3"));
fourButton.addEventListener("click", () => handleNumber("4"));
fiveButton.addEventListener("click", () => handleNumber("5"));
sixButton.addEventListener("click", () => handleNumber("6"));
sevenButton.addEventListener("click", () => handleNumber("7"));
eightButton.addEventListener("click", () => handleNumber("8"));
nineButton.addEventListener("click", () => handleNumber("9"));

// Keybinds
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        handleNumber(key);
    } else {
        switch (key) {
            case "+":
            case "-":
            case "*":
            case "/":
                handleOperator(key);
                break;
            case "Enter":
            case "=":
                event.preventDefault(); // Prevent form submission if any
                handleEqual();
                break;
            case "Backspace":
                handleDelete();
                break;
            case "Escape":
                handleClear();
                break;
            case ".":
                handleDot();
                break;
        }
    }
});