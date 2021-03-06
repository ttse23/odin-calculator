// arithmetic functions
function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    if (b === 0){
        return "Error"
    }
    return a / b
}

// operate function
function operate(operator, a, b){
    if (isNaN(a) || isNaN(b)){
        console.log("Please enter a valid math expression!")
        return
    }
    switch (operator){
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "×":
            return multiply(a, b)
        case "÷":
            return divide(a, b)
        default:
            // console.log("Please enter a valid math operator!")
            return
    }
}


const numberBtns = document.querySelectorAll(".number")
const operatorBtns = document.querySelectorAll(".operator")
const equalsBtn = document.querySelector("#equals")
const clearBtn = document.querySelector("#clear")
const delBtn = document.querySelector("#delete")
const changeSignBtn = document.querySelector("#changeSign")
const decimalBtn = document.querySelector("#decimal")
const currentOperation = document.querySelector("#currentOperation")
// const lastOperation = document.querySelector("#lastOperation")

window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9"){
        appendNumber(e.key)
    } 
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/"){
        // fix this, maybe incorporate a save operator function?
        console.log(e.key)
    }
    if (e.key === "."){
        addDecimal()
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp"){
        changeSign()
    }
    if (e.key === "Enter"){
        evaluate()
    }
    if (e.key === "Backspace"){
        del()
    }
    if (e.key === "Escape"){
        clear()
    }
})

function appendNumber(n){
    currentOperation.innerText += n
    prevKey = "number"
}

Array.from(numberBtns).forEach(number => number.addEventListener("click", updateDisplay))
Array.from(operatorBtns).forEach(operator => operator.addEventListener("click", storeFirstNum))
equalsBtn.addEventListener("click", evaluate)


// DEFAULT
let a = undefined
let b = undefined
let c = undefined
let operator = ""
let prevKey = ""

// update display function
function updateDisplay(){
    if (currentOperation.innerText === "0" || prevKey === "operator" || prevKey === "equals"){
        currentOperation.innerText = this.innerText
    } else if ((currentOperation.innerText.length <= 10)){
        currentOperation.innerText += this.innerText
    }
    prevKey = "number"
}

function storeFirstNum(){
    // if (prevKey === "equals"){
    //     lastOperation.innerText = ""
    // }
    if (a && !b && prevKey !== "operator"){
        c = Number(currentOperation.innerText)
        currentOperation.innerText = Math.round(operate(operator, a, c) * 10000) / 10000
    }
    a = Number(currentOperation.innerText)
    operator = this.innerText
    // lastOperation.innerText += `${currentOperation.innerText}${this.innerText}`
    // this.classList.add("active")
    prevKey = "operator"
}

function evaluate(){
    if (prevKey === "equals"){
        a = Number(currentOperation.innerText)
    } else{
        b = Number(currentOperation.innerText)
    }
    // lastOperation.innerText += `${currentOperation.innerText}=`
    currentOperation.innerText = Math.round(operate(operator, a, b) * 10000) / 10000
    prevKey = "equals"
}

clearBtn.addEventListener("click", clear)
function clear(){
    currentOperation.innerText = "0"
    // lastOperation.innerText = ""
    a = undefined
    b = undefined
    operator = ""
    prevKey = ""
}

delBtn.addEventListener("click", del)
function del(){
    if (prevKey !== "equals"){
        if (currentOperation.innerText.slice(0, -1).length === 0){
            currentOperation.innerText = "0"
        } else{
            currentOperation.innerText = currentOperation.innerText.slice(0, -1)
        }
    }
}

changeSignBtn.addEventListener("click", changeSign)
function changeSign(){
    if (currentOperation.innerText === "0" || prevKey === "operator"){
        currentOperation.innerText = "-"
    } else if (currentOperation.innerText[0] === "-"){
        currentOperation.innerText = currentOperation.innerText.slice(1)
    } else{
        currentOperation.innerText = "-" + currentOperation.innerText
    }
    prevKey = "changeSign"
}

decimalBtn.addEventListener("click", addDecimal)
function addDecimal(){
    if (prevKey === "equals" || prevKey === "operator"){
        currentOperation.innerText = "0."
    } else if (!currentOperation.innerText.includes(".")){
        currentOperation.innerText += "."
    }    
    prevKey = "decimal"
}


// limit result of operate to string length <= 10
// chain calcs still not working correctly