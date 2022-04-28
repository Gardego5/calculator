import Calculator from "./modules/Calculator.js";

let calculator = new Calculator();

// Button EventListener
document.getElementById("op-equals").addEventListener("click", () => calculator.pushNumberToStack());
document.getElementById("op-clear").addEventListener("click", () => calculator.clear());
document.getElementById("op-clear-all").addEventListener("click", () => calculator.clearAll());
document.getElementById("op-drop").addEventListener("click", () => calculator.drop());
document.getElementById("op-roll").addEventListener("click", () => calculator.roll());
document.getElementById("op-swap").addEventListener("click", () => calculator.swap());
document.getElementById("op-currency-mode").addEventListener("click", () => calculator.setCurrencyMode());
document.getElementById("op-normal-mode").addEventListener("click", () => calculator.setNormalMode());

document.getElementById("op-divide").addEventListener("click", () => calculator.divide());
document.getElementById("op-multiply").addEventListener("click", () => calculator.multiply());
document.getElementById("op-subtract").addEventListener("click", () => calculator.subtract());
document.getElementById("op-add").addEventListener("click", () => calculator.add());

document.getElementById("op-sign").addEventListener("click", () => calculator.swapSign());

document.getElementById("op-sum").addEventListener("click", () => calculator.sum());

document.getElementById("op-sqrt").addEventListener("click", () => calculator.sqrt());
document.getElementById("op-square").addEventListener("click", () => calculator.square());
document.getElementById("op-root").addEventListener("click", () => calculator.root());
document.getElementById("op-power").addEventListener("click", () => calculator.power());

document.getElementById("op-sin").addEventListener("click", () => calculator.sin());
document.getElementById("op-cos").addEventListener("click", () => calculator.cos());
document.getElementById("op-tan").addEventListener("click", () => calculator.tan());

for (let digitElement of document.getElementsByClassName("digit")) {
    if (digitElement.childNodes[0].innerHTML.charCodeAt(0) === 8455) {
        digitElement.addEventListener("click", () => {
            calculator.setNumber(Math.E);
        });
    } else if (digitElement.childNodes[0].innerHTML.charCodeAt(0) === 960) {
        digitElement.addEventListener("click", () => {
            calculator.setNumber(Math.PI);
        });
    } else {
        digitElement.addEventListener("click", () => {
            calculator.addDigit(digitElement.childNodes[0].innerHTML);
        });
    }
}

document.getElementById("op-home-page").addEventListener("click", () => {
    document.getElementById("op-home-page").style.display = "none";
    document.getElementById("op-confirm-home-page").style.display = "flex";
});
document.getElementById("op-confirm-home-page").addEventListener("click", () => window.location.href = "https://www.gjdcode.com");

// Keyboard EventListener
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            calculator.addDigit(event.key);
            break;
        case "Enter":
        case "=":
            calculator.pushNumberToStack();
            break;
        case "/":
            calculator.divide();
            break;
        case "*":
            calculator.multiply();
            break;
        case "-":
            calculator.subtract();
            break;
        case "+":
            calculator.add();
            break;
        case "d":
        case "D":
            calculator.drop();
            break;
        case "c":
            if (calculator.mainField.innerHTML === "") {
                calculator.clearAll();
            } else {
                calculator.clear();
            }
            break;
        case "C":
            calculator.clearAll();
            break;
        case "Backspace":
            calculator.deleteDigit();
            break
    }
});
