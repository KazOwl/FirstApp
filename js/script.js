let numbers
let valueMain
let valueSecond
let reset
let operation
let valueOne = 0
let valueTwo = 0
let math = null
let numberOne = null
let numberTwo = null
let result
let done = false
let cal
let topScreen
let checkNum = false
let del

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	numbers = document.querySelectorAll('.number')
	operation = document.querySelectorAll('.operation')
	valueMain = document.querySelector('.main-value')
	valueSecond = document.querySelector('.second-value')
	reset = document.querySelector('.reset')
	result = document.querySelector('.result')
	cal = document.querySelectorAll('.calc')
	del = document.querySelector('.delete')
}

const prepareDOMEvents = () => {
	numbers.forEach((showNumber) =>
		showNumber.addEventListener('click', beforeCheck)
	)
	operation.forEach((math) => math.addEventListener('click', showOperationMath))
	reset.addEventListener('click', clear)
	result.addEventListener('click', getResult)
	del.addEventListener('click', deleteChar)
	window.addEventListener('keydown', writeNum)
}

const beforeCheck = (e) => {
	if (valueMain.textContent == '.' && numberOne.includes('.')) return

	if (!done) {
		if (!checkNum) {
			inputNumber(e)
		} else {
			valueMain.textContent = ''
			checkNum = false
			inputNumber(e)
		}
	} else {
		valueMain.textContent = ''
		valueSecond.textContent = ''
		valueOne = ''
		valueTwo = ''
		done = false
		inputNumber(e)
	}
}

const inputNumber = (e) => {
	if (valueMain.textContent.length != 14) {
		if (valueSecond.textContent == '') {
			numberOne = e.target.textContent
			valueMain.textContent += numberOne
			valueOne = parseFloat(valueMain.textContent)
		} else {
			numberTwo = e.target.textContent
			valueMain.textContent += numberTwo
			valueTwo = parseFloat(valueMain.textContent)
		}
	} else {
		return
	}
}

const writeNum = (e) => {
	if (
		valueSecond.textContent == '' &&
		e.key >= 0 &&
		e.key <= 9 &&
		valueMain.textContent.length != 14
	) {
		numberOne = e.key
		valueMain.textContent += numberOne
		valueOne = parseFloat(valueMain.textContent)
	} else if (
		valueSecond.textContent != '' &&
		e.key >= 0 &&
		e.key <= 9 &&
		valueMain.textContent.length != 14
	) {
		numberTwo = e.key
		valueMain.textContent += numberTwo
		valueTwo = parseFloat(valueMain.textContent)
	} else return

}

const clear = () => {
	valueSecond.textContent = ''
	valueMain.textContent = ''
	valueOne = ''
	valueTwo = ''
}

const deleteChar = () => {
	if (valueSecond.textContent == '') {
		valueMain.textContent = valueMain.textContent.slice(0, -1)
		valueOne = valueMain.textContent
		console.log(valueOne)
	} else {
		valueMain.textContent = valueMain.textContent.slice(0, -1)
		valueTwo = valueMain.textContent
		console.log(valueTwo)
	}
}

const showOperationMath = (e) => {
	math = e.target.textContent
	topScreen = valueMain.textContent + math
	valueSecond.textContent = topScreen
	checkNum = true
}

const getResult = () => {
	if (numberTwo !== null && numberOne !== null) {
		switch (math) {
			case '+':
				{
					valueSecond.textContent = `${topScreen}${valueTwo} =`
					valueMain.textContent = parseFloat(valueOne) + parseFloat(valueTwo)
				}
				break

			case '×':
				{
					valueSecond.textContent = `${topScreen}${valueTwo} =`
					const num = parseFloat(valueOne) * parseFloat(valueTwo)
					valueMain.textContent = num
				}
				break

			case '–':
				{
					valueSecond.textContent = `${topScreen}${valueTwo} =`
					valueMain.textContent = parseFloat(valueOne) - parseFloat(valueTwo)
				}
				break
			case '/':
				{
					if (valueTwo == '0') {
						valueMain.textContent = 'Error: Dont / by 0'
					} else {
						valueSecond.textContent = `${topScreen}${valueTwo} =`
						valueMain.textContent = parseFloat(valueOne) / parseFloat(valueTwo)
						console.log(`dzielenie`)
					}
				}
				break
		}
		done = true
		math = null
	} else return
}

document.addEventListener('DOMContentLoaded', main)
