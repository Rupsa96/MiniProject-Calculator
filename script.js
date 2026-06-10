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
  "1", "2", "3",
  ".", "0", "="
];

let expression = "";

buttons.forEach((value) => {
  const button = document.createElement("button");

  button.innerText = value;
  button.style.height = "50px";
  button.style.fontSize = "20px";

  // IDs for specific buttons
  if (value === "C") button.id = "clear";
  else if (value === "⌫") button.id = "backspace";
  else if (value === "=") button.id = "equal";
  else if (value === "+") button.id = "add";
  else if (value === "-") button.id = "subtract";
  else if (value === "*") button.id = "multiply";
  else if (value === "/") button.id = "divide";
  else button.id = value;

if(value === "="){
    // don't add operator class
}
else if("0123456789.".includes(value)){
    button.classList.add("number");
}
else{
    button.classList.add("operator");
}

  button.addEventListener("click", () => {
    if (value === "C") {
      expression = "";
      display.value = "";
    } else if (value === "⌫") {
      expression = expression.slice(0, -1);
      display.value = expression;
    } else if (value === "=") {
      try {
        display.value = eval(expression);
        expression = display.value.toString();
      } catch {
        display.value = "Error";
        expression = "";
      }
    } else {
      expression += value;
      display.value = expression;
    }
  });

  calculator.append(button);
});

const title = document.createElement("h1");
title.textContent = "My Calculator";

title.id = "title";

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
    alert("Only numbers are allowed");
    return;
  }

  if (e.key === "Enter") {
    try {
      display.value = eval(expression);
      expression = display.value.toString();
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