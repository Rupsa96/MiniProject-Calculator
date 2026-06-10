
// Create Calculator Container
const calculator = document.createElement("div");
calculator.id = "calculator";

calculator.style.width = "300px";
calculator.style.margin = "50px auto";
calculator.style.padding = "20px";
calculator.style.border = "1px solid #ccc";
calculator.style.borderRadius = "10px";
calculator.style.display = "grid";
calculator.style.gridTemplateColumns = "repeat(4,1fr)";
calculator.style.gap = "10px";

// Display
const display = document.createElement("input");
display.id = "result";
display.type = "text";
display.readOnly = true;

display.style.gridColumn = "span 4";
display.style.height = "50px";
display.style.fontSize = "24px";

calculator.append(display);

// Buttons
const buttons = [
  "C", "⌫", "/", "*",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "%",
  ".", "0", "="
];

let expression = "";

// Function to calculate
function calculateExpression(expression) {

  const numbers = [];
  const operators = [];

  function precedence(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/" || op === "%") return 2;
    return 0;
}

  function applyOperation() {

    const b = numbers.pop();
    const a = numbers.pop();
    const op = operators.pop();

    let result;

    switch (op) {
        case "+":
            result = a + b;
            break;

        case "-":
            result = a - b;
            break;

        case "*":
            result = a * b;
            break;

        case "/":
            if (b === 0) {
            throw new Error("Division by zero");
            }
            result = a / b;
            break;

        case "%":
            if (b === 0) {
            throw new Error("Modulo by zero");
            }
            result = a % b;
            break;
        }

    numbers.push(result);
  }

  let i = 0;

  while (i < expression.length) {

    if (expression[i] === " ") {
      i++;
      continue;
    }

    if (!isNaN(expression[i]) || expression[i] === ".") {

      let num = "";

      while (
        i < expression.length &&
        (!isNaN(expression[i]) || expression[i] === ".")
      ) {
        num += expression[i];
        i++;
      }

      numbers.push(Number(num));
      continue;
    }

    const currentOperator = expression[i];

    while (
      operators.length &&
      precedence(operators[operators.length - 1]) >=
      precedence(currentOperator)
    ) {
      applyOperation();
    }

    operators.push(currentOperator);
    i++;
  }

  while (operators.length) {
    applyOperation();
  }

  return numbers.pop();
}

// Create Buttons
buttons.forEach((value) => {

  const button = document.createElement("button");

  button.innerText = value;
  button.style.height = "50px";
  button.style.fontSize = "20px";

  // IDs
    if (value === "C") button.id = "clear";
    else if (value === "⌫") button.id = "backspace";
    else if (value === "=") button.id = "equal";
    else if (value === "+") button.id = "add";
    else if (value === "-") button.id = "subtract";
    else if (value === "*") button.id = "multiply";
    else if (value === "/") button.id = "divide";
    else if (value === "%") button.id = "modulus";
    else button.id = value;

  // Classes
  if (value === "=") {

  }
  else if ("0123456789.".includes(value)) {
    button.classList.add("number");
  }
  else {
    button.classList.add("operator");
  }

  // Click Event
  button.addEventListener("click", () => {

    if (value === "C") {
      expression = "";
      display.value = "";
    }

    else if (value === "⌫") {
      expression = expression.slice(0, -1);
      display.value = expression;
    }

    else if (value === "=") {

      try {

        const result = calculateExpression(expression);

        display.value = result;

        if (result !== "Error") {
          expression = result.toString();
        } else {
          expression = "";
        }

      } catch {

        display.value = "Error";
        expression = "";
      }
    }

    else {
      expression += value;
      display.value = expression;
    }
  });

  calculator.append(button);
});

// Title
const title = document.createElement("h1");
title.textContent = "My Calculator";
title.id = "title";

// Wrapper
const wrapper = document.createElement("div");
wrapper.id = "wrapper";

wrapper.append(title);
wrapper.append(calculator);

document.body.append(wrapper);

// Keyboard Support
document.addEventListener("keydown", (e) => {

  const allowedKeys = [
  "0","1","2","3","4",
  "5","6","7","8","9",
  "+","-","*","/","%",
  ".","Enter","Backspace"
];

  if (!allowedKeys.includes(e.key)) {
    alert("Only numbers and operators are allowed");
    return;
  }

  if (e.key === "Enter") {

    try {

      const result = calculateExpression(expression);

      display.value = result;

      if (result !== "Error") {
        expression = result.toString();
      } else {
        expression = "";
      }

    } catch {

      display.value = "Error";
      expression = "";
    }
  }

  else if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression;
  }

  else {
    expression += e.key;
    display.value = expression;
  }
});

