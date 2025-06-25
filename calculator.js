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
    switch (operator) {
        case "+":
            return add(op1, op2);
        case "-":
            return subtract(op1, op2);
        case "*":
            return multiply(op1, op2);
        case "/":
            return divide(op1, op2);
        default:
            return "Invalid operator";
    }
}

let operand1 = 6;
let operand2 = 2;
let operator = "+";