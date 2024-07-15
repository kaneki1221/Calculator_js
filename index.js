function appendNumber(number) {
    const display = document.getElementById('display');
    if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    const lastChar = display.value.charAt(display.value.length - 1);

    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '%') {
        return; // Prevent consecutive operators
    }

    display.value += operator;
}

function clearDisplay() {
    document.getElementById('display').value = '0';
}

function calculateResult() {
    const display = document.getElementById('display');
    let result;
    
    try {
        result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}
