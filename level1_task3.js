const display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = '';
let hasDecimal = false;

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.getAttribute('data-action');
    const number = button.getAttribute('data-number');

    if (number) {
      appendNumber(number);
    } else if (action) {
      handleAction(action);
    }
  });
});

function appendNumber(number) {
  if (currentInput === '0' && number === '0') return; 
  if (currentInput === '0' && number !== '.') currentInput = ''; 
  if (currentInput.includes('.') && number === '.') return; 
  
  currentInput += number;
  updateDisplay();
}

function handleAction(action) {
  if (action === 'clear') {
    clearCalculator();
  } else if (action === 'backspace') {
    currentInput = currentInput.slice(0, -1) || '0';
    updateDisplay();
  } else if (action === 'decimal') {
    if (!hasDecimal) {
      currentInput += '.';
      hasDecimal = true;
      updateDisplay();
    }
  } else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
    if (currentInput !== '') {
      operator = action;
      previousInput = currentInput;
      currentInput = '0';
      hasDecimal = false;
    }
  } else if (action === 'equals') {
    calculate();
  }
}

function clearCalculator() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  hasDecimal = false;
  updateDisplay();
}

function calculate() {
  let result;
  const previous = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(previous) || isNaN(current)) return;

  switch (operator) {
    case 'add':
      result = previous + current;
      break;
    case 'subtract':
      result = previous - current;
      break;
    case 'multiply':
      result = previous * current;
      break;
    case 'divide':
      if (current === 0) {
        alert("Cannot divide by 0!");
        clearCalculator();
        return;
      }
      result = previous / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = '';
  hasDecimal = currentInput.includes('.');
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput;
}

// Optional: Adding keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (!isNaN(key)) appendNumber(key);
  if (key === '.') handleAction('decimal');
  if (key === 'Backspace') handleAction('backspace');
  if (['+', '-', '*', '/'].includes(key)) handleAction(
    key === '+' ? 'add' : key === '-' ? 'subtract' : key === '*' ? 'multiply' : 'divide'
  );
  if (key === 'Enter') handleAction('equals');
  if (key === 'Escape') handleAction('clear');
});
