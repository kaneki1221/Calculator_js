document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");

    function appendNumber(number) {
        display.value += number;
    }

    function appendOperator(operator) {
        const lastChar = display.value.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            display.value = display.value.slice(0, -1) + operator;
        } else if (display.value !== "") {
            display.value += operator;
        }
    }

    function clearDisplay() {
        display.value = "";
    }

    function calculateResult() {
        const expression = display.value;
        if (isValidExpression(expression)) {
            display.value = evaluateExpression(expression);
        } else {
            display.value = "Error";
        }
    }

    function isValidExpression(expression) {
      
        const validPattern = /^(\d+(\.\d+)?)([+\-*/%](\d+(\.\d+)?))*$/;
        return validPattern.test(expression);
    }

    function evaluateExpression(expression) {
        const tokens = expression.split(/([+\-*/%])/).filter(Boolean);
        const values = [];
        const operators = [];

        function applyOperator(operator, b, a) {
            switch (operator) {
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/': return a / b;
                case '%': return a % b;
            }
        }

        function precedence(operator) {
            switch (operator) {
                case '+':
                case '-': return 1;
                case '*':
                case '/':
                case '%': return 2;
            }
            return 0;
        }

        for (let token of tokens) {
            if (!isNaN(token)) {
                values.push(parseFloat(token));
            } else {
                while (operators.length && precedence(operators[operators.length - 1]) >= precedence(token)) {
                    const operator = operators.pop();
                    const b = values.pop();
                    const a = values.pop();
                    values.push(applyOperator(operator, b, a));
                }
                operators.push(token);
            }
        }

        while (operators.length) {
            const operator = operators.pop();
            const b = values.pop();
            const a = values.pop();
            values.push(applyOperator(operator, b, a));
        }

        return values[0];
    }

  
    window.appendNumber = appendNumber;
    window.appendOperator = appendOperator;
    window.clearDisplay = clearDisplay;
    window.calculateResult = calculateResult;
});
