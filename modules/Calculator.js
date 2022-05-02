export default class Calculator {
    constructor(mainField, stackFields) {
        this.stack = [];
        this.currentValue = 0;
        this.displayedValue = "";

        this.shouldPushMainField = false;
        this.currencyMode = false;

        this.mainField = document.getElementById("stack-0");
        this.stackFields = [
            document.getElementById("stack-1"),
            document.getElementById("stack-2"),
            document.getElementById("stack-3"),
        ];
        this.counterField = document.getElementById("stack-counter");
    }

    addDigit(digit) {
        if (this.shouldPushMainField) {
            this.pushNumberToStack(false);
            this.displayedValue = "";
            this.shouldPushMainField = false;
        } else if (this.shouldClearMainField) {
            this.displayedValue = ""
            this.currentValue = 0;
            this.shouldClearMainField = false;
        }

        let afterAddingDigit = this.displayedValue + String(digit);
        
        if (validNumber(afterAddingDigit)) {
            this.displayedValue = afterAddingDigit;
            this.currentValue = Number(afterAddingDigit);
        }

        this.render();
    }

    deleteDigit() {
        this.shouldPushMainField = false;
        this.shouldClearMainField = false;

        let afterRemovingDigit = this.displayedValue.slice(0, -1);

        if (validNumber(afterRemovingDigit)) {
            this.displayedValue = afterRemovingDigit;
            this.currentValue = Number(afterRemovingDigit);
        }

        this.render()
    }

    setNumber(number) {
        if (this.shouldPushMainField) {
            this.pushNumberToStack(false);
            this.displayedValue = "";
            this.shouldPushMainField = false;
        } else if (this.shouldClearMainField) {
            this.displayedValue = ""
            this.currentValue = 0;
            this.shouldClearMainField = false;
        }

        this.currentValue = number;
        this.displayedValue = String(this.currentValue);

        this.render();
    }

    clear() {
        this.currentValue = 0;
        this.displayedValue = "";
        this.shouldPushMainField = false;

        this.render();
    }

    clearAll() {
        this.currentValue = 0;
        this.displayedValue = "";
        this.stack = [];
        this.shouldPushMainField = false;

        this.render();
    }

    drop() {
        if (this.stack.length) { // If there's anything on the stack, drop the stack down
            this.currentValue = this.stack.shift()
            this.displayedValue = String(this.currentValue);
            this.shouldPushMainField = true;
        } else {
            this.clear();
        }

        this.render();
    }

    roll() {
        if (this.stack.length) {
            const oldValue = this.currentValue;
            this.currentValue = this.stack.shift();
            this.displayedValue = String(this.currentValue);
            this.stack.push(oldValue);
        }

        this.render();
    }

    swap() {
        if (this.stack.length) {
            const oldValue = this.currentValue;
            this.currentValue = this.stack.shift();
            this.displayedValue = String(this.currentValue);
            this.stack.unshift(oldValue);
        }

        this.render();
    }

    setNormalMode() {
        this.currencyMode = false;

        this.render();
    }

    setCurrencyMode() {
        this.currencyMode = true;

        this.render();
    }

    divide() {
        if (this.stack.length) {
            this.stack[0] = Number(this.stack[0]) / this.currentValue;
            this.drop();
        }

        this.render();
    }

    multiply() {
        if (this.stack.length) {
            this.stack[0] = Number(this.stack[0]) * this.currentValue;
            this.drop();
        }

        this.render();
    }

    subtract() {
        if (this.stack.length) {
            this.stack[0] = Number(this.stack[0]) - this.currentValue;
            this.drop();
        }

        this.render();
    }

    add() {
        if (this.stack.length) {
            this.stack[0] = Number(this.stack[0]) + this.currentValue;
            this.drop();
        }

        this.render();
    }

    sqrt() {
        this.currentValue = Math.sqrt(this.currentValue);
        this.displayedValue = String(this.currentValue);
        this.shouldPushMainField = true;

        this.render();
    }

    square() {
        this.currentValue = Math.pow(this.currentValue, 2);
        this.displayedValue = String(this.currentValue);
        this.shouldPushMainField = true;

        this.render();
    }

    root() {
        if (this.stack.length) {
            this.stack[0] = Math.pow(this.currentValue, 1 / this.stack[0]);
            this.drop();
        }

        this.render();
    }

    power() {
        if (this.stack.length) {
            this.stack[0] = Math.pow(this.currentValue, this.stack[0]);
            this.drop();
        }

        this.render();
    }

    sin() {
        this.currentValue = Math.sin(this.currentValue);
        this.displayedValue = String(this.currentValue);

        this.render();
    }

    cos() {
        this.currentValue = Math.cos(this.currentValue);
        this.displayedValue = String(this.currentValue);

        this.render();
    }

    tan() {
        this.currentValue = Math.tan(this.currentValue);
        this.displayedValue = String(this.currentValue);

        this.render();
    }

    swapSign() {
        if (this.displayedValue == "-") {
            this.displayedValue = "";
        } else if (this.displayedValue.length) {
            this.currentValue *= -1;
            this.displayedValue = String(this.currentValue);
        } else  {
            this.displayedValue = "-";
        }

        this.render();
    }

    sum() {
        this.currentValue = this.stack.reduce((a, b) => a + b);
        this.displayedValue = String(this.currentValue);

        this.render();
    }

    pushNumberToStack(clear = true) {
        if (this.displayedValue) {
            this.stack.unshift(this.currentValue);
        }

        this.shouldClearMainField = clear;

        this.render();
    }

    render() {
        // Clear all stackFields.
        for (let field of this.stackFields) {
            field.textContent = "";
        }

        // Display stack values in stackFields.
        for (let i in this.stack.slice(0, 3)) {
            this.stackFields[i].textContent = valueToDisplayedValue(this.currencyMode, this.stack[i]);
        }

        // Display the displayedValue in mainField.
        this.mainField.textContent = valueToDisplayedValue(this.currencyMode, this.displayedValue);

        // Show stack size in counterField.
        this.counterField.textContent = this.stack.length;

        // Only show Clear All button if appropriate.
        if (this.displayedValue === "" && this.stack.length) {
            document.getElementById("op-clear").style.display = "none";
            document.getElementById("op-clear-all").style.display = "flex";
        } else {
            document.getElementById("op-clear").style.display = "";
            document.getElementById("op-clear-all").style.display = "";
        }

        // Switch mode buttons.
        if (this.currencyMode) {
            document.getElementById("op-currency-mode").style.display = "none";
            document.getElementById("op-normal-mode").style.display = "flex";
        } else {
            document.getElementById("op-currency-mode").style.display = "";
            document.getElementById("op-normal-mode").style.display = "";
        }

        // Hide confirm leave page button after any interaction.
        document.getElementById("op-home-page").style.display = "";
        document.getElementById("op-confirm-home-page").style.display = "";
    }
}

const validNumber = (numberString) => /^[-+]?([0-9]*[.])?[0-9]*$/.test(numberString);
const valueToDisplayedValue = (mode, number) => (mode && validNumber(number)) ? Number(number).toFixed(2) : number;