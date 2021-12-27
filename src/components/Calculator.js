import { useState } from 'react'

export default function Calculator() {
	const [operation, setOperation] = useState('')
	const [isNegative, setNegative] = useState(false)
	const [isCalculated, setCalculated] = useState(false)
	const [isPointUsed, setPointUsed] = useState(false)
	const [isPreviousNumberSet, setPreviousNumberSet] = useState(false)
	let [previousNumber, setPreviousNumber] = useState('')
	let [currentNumber, setCurrentNumber] = useState('0')

	const clearAll = () => {
		setOperation('')
		setNegative(false)
		setPointUsed(false)
		setPreviousNumberSet(false)
		setPreviousNumber('')
		setCurrentNumber('0')
	}

	const deleteLast = () => {
		if (currentNumber.length === 1) {
			setCurrentNumber('0')
			return
		}
		currentNumber = currentNumber.slice(0, -1)
		setCurrentNumber(currentNumber)
	}

	const handleOperation = button => {
		const buttonContent = button.target.innerText
		if (currentNumber === '-') return
		if (
			buttonContent === '-' &&
			!isNegative &&
			(currentNumber.length === 0 || currentNumber === '0')
		) {
			addToDisplay(button)
			setNegative(true)
			return
		}
		setOperation(buttonContent)
		if (currentNumber === '') return
		setPreviousNumber(currentNumber)
		setPreviousNumberSet(true)
		setCurrentNumber('')
		setPointUsed(false)
		calculate(button)
	}

	const addToDisplay = button => {
		const buttonContent = button.target.innerText
		if (buttonContent === '.') {
			if (isPointUsed) return
			setPointUsed(true)
		}
		if (isCalculated) {
			currentNumber = ''
			setCalculated(false)
		}
		if (currentNumber === '0' || (isPreviousNumberSet && currentNumber === ''))
			currentNumber = ''
		currentNumber += buttonContent
		setCurrentNumber(currentNumber)
	}

	const calculate = button => {
		const buttonContent = button.target.innerText
		let results
		previousNumber = Number(previousNumber)
		currentNumber = Number(currentNumber)
		switch (operation) {
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
		if (buttonContent !== '=') {
			setPreviousNumber(results.toString())
			return
		}
		setCurrentNumber(results.toString())
		setPreviousNumber('')
		setOperation('')
		setPreviousNumberSet(false)
		setNegative(false)
		setCalculated(true)
	}

	return (
		<div className="calculator">
			<div className="screen">
				<div className="previous">
					{previousNumber} {operation}
				</div>
				<div className="current">{currentNumber}</div>
			</div>
			<div className="buttons-grid">
				<button onClick={clearAll}>AC</button>
				<button onClick={handleOperation}>÷</button>
				<button onClick={handleOperation}>*</button>
				<button onClick={addToDisplay}>7</button>
				<button onClick={addToDisplay}>8</button>
				<button onClick={addToDisplay}>9</button>
				<button onClick={handleOperation}>-</button>
				<button onClick={addToDisplay}>4</button>
				<button onClick={addToDisplay}>5</button>
				<button onClick={addToDisplay}>6</button>
				<button onClick={handleOperation}>+</button>
				<button onClick={addToDisplay}>1</button>
				<button onClick={addToDisplay}>2</button>
				<button onClick={addToDisplay}>3</button>
				<button onClick={calculate}>=</button>
				<button onClick={addToDisplay}>.</button>
				<button onClick={addToDisplay}>0</button>
				<button onClick={deleteLast}>DEL</button>
			</div>
		</div>
	)
}
