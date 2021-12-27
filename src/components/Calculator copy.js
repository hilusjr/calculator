import { useState } from 'react'

export default function Calculator() {
	const [equation, setEquation] = useState('')
	const [isPointUsed, setPointUsed] = useState(false)
	const [isCalculated, setCalculated] = useState(false)
	let [previousNumber, setPreviousNumber] = useState('')
	let [currentNumber, setCurrentNumber] = useState('0')

	const clearAll = () => {
		setEquation('')
		setPointUsed(false)
		setCalculated(false)
		setPreviousNumber('')
		setCurrentNumber('0')
	}

	const deleteLast = () => {
		currentNumber = currentNumber.slice(0, -1)
		if (currentNumber.length === 0) currentNumber = '0'
		setCurrentNumber(currentNumber)
	}

	const updateDisplay = button => {
		const buttonContent = button.target.innerText
		const buttonEquation = button.target.dataset.equation
		if (buttonEquation && buttonContent !== '-') {
			setCurrentNumber('')
			return
		}
		if (isCalculated && (currentNumber.length === 0 || previousNumber === '')) {
			currentNumber = ''
		}
		if (buttonContent === '.') {
			if (isPointUsed) return
			setPointUsed(true)
		}
		if (currentNumber === '0') currentNumber = ''
		currentNumber += buttonContent
		setCurrentNumber(currentNumber)
	}

	const calculate = button => {
		const buttonContent = button.target.innerText
		const buttonEquation = button.target.dataset.equation
		let results
		if (buttonContent === '=' && previousNumber === '') return
		setPreviousNumber(currentNumber)
		setEquation(buttonEquation)
		setPointUsed(false)
		if (buttonContent !== '=') updateDisplay(button)
		currentNumber = Number(currentNumber)
		previousNumber = Number(previousNumber)
		switch (equation) {
			case '+':
				results = previousNumber + currentNumber
				break
			case '-':
				results = previousNumber - currentNumber
				break
			case '*':
				results = previousNumber * currentNumber
				break
			case '÷':
				results = previousNumber / currentNumber
				break
			default:
				break
		}
		if (isNaN(results)) return
		results = Math.round((results + Number.EPSILON) * 100) / 100
		if (buttonContent === '=') {
			setPreviousNumber('')
			setCurrentNumber(results.toString())
			return
		}
		setPreviousNumber(results.toString())
		setCalculated(true)
	}

	const buttons = [
		{ content: 'AC', clickHandler: clearAll },
		{ content: '÷', clickHandler: calculate, equation: '÷' },
		{ content: '*', clickHandler: calculate, equation: '*' },
		{ content: 7, clickHandler: updateDisplay },
		{ content: 8, clickHandler: updateDisplay },
		{ content: 9, clickHandler: updateDisplay },
		{ content: '-', clickHandler: calculate, equation: '-' },
		{ content: 4, clickHandler: updateDisplay },
		{ content: 5, clickHandler: updateDisplay },
		{ content: 6, clickHandler: updateDisplay },
		{ content: '+', clickHandler: calculate, equation: '+' },
		{ content: 1, clickHandler: updateDisplay },
		{ content: 2, clickHandler: updateDisplay },
		{ content: 3, clickHandler: updateDisplay },
		{ content: '=', clickHandler: calculate },
		{ content: '.', clickHandler: updateDisplay },
		{ content: 0, clickHandler: updateDisplay },
		{ content: 'DEL', clickHandler: deleteLast },
	]

	return (
		<div className="calculator">
			<div className="screen">
				<div className="previous">
					{previousNumber} {equation}
				</div>
				<div className="current">{currentNumber}</div>
			</div>
			<div className="buttons-grid">
				{buttons.map(button => (
					<CalculatorButton
						key={button.content}
						content={button.content}
						clickHandler={button.clickHandler}
						dataEquation={button.equation}
					/>
				))}
			</div>
		</div>
	)
}

function CalculatorButton({ content, clickHandler, dataEquation }) {
	return (
		<button onClick={clickHandler} data-equation={dataEquation}>
			{content}
		</button>
	)
}
