import { useState } from 'react'
import './App.css'


function App() {
  const [answer, setAnswer] = useState('');
  const [expression, setExpression] = useState('0');

  const isOperator = (symbol: string) => {
    return /[-+/*]/g.test(symbol);
  }
  
  let term = expression.split(/[-+/*]/g);
  let currentTerm = term[term.length - 1];
  let current = currentTerm.charAt(currentTerm.length - 1);

  const buttonPress = (symbol: string) => {
    if (isOperator(symbol)) {
      if (symbol == '-'){
        if (expression.charAt(expression.length - 1) == '-' &&
            expression.charAt(expression.length - 2) == '-') return;
        setExpression(expression + symbol);
      } else if (expression === ''){
        if (answer !== '0') {
          setExpression(answer.toString() + symbol)
        }
        return;
      } else if (!isOperator(expression.charAt(expression.length - 1))) {
          setExpression(expression + symbol);
      } else {
        setExpression(expression.slice(0,-1) + symbol)
      }
    } else {
      switch(symbol) {
        case 'clear':
          setAnswer('');
          setExpression('0');
          break;
        case 'negative':
          if (answer == '0') return;
          setAnswer(answer.toString().charAt(0) == '-'
          ? answer.slice(1) : '-' + answer);
          break;
        case '=':
          evaluate();
          break;
        case '.':
          if (currentTerm.includes('.')) return;
          setExpression(expression + symbol);
          break;
        case '0':
          if (currentTerm.charAt(0) == '0') {
            if (currentTerm.includes('.')) {
              setExpression(expression + symbol);
            }
          } else {
            setExpression(expression + symbol);
          }
          break;
        default:
          if (currentTerm.charAt(0) == '0' && !currentTerm.includes('.')) {
            setExpression(expression.slice(0,-1) + symbol);
          } else if (expression.charAt(expression.length - 1) == '-' && 
          isOperator(expression.charAt(expression.length - 2))) {
            setExpression(expression.slice(0, expression.length - 1) 
            + '(-' + symbol + ')');
          }
          else {
            setExpression(expression + symbol);
          }
          break;
      }
    }
  }

  const evaluate = () => {
    if (isOperator(current)) return;
    else {
      setAnswer(eval(expression));
      setExpression('');
    }
  };

  return (
    <>
    <div className="container">
      <h1>JS Calculator</h1>
      <div id="calculator">
        <div id="display-container">
          <div id="display" className='expression'>{ expression }</div>
          <div id="display" className='answer'>{ answer }</div>
        </div>
        <div className="buttons">
        <button id="seven" onClick={() => buttonPress("7")} className="primary">7</button>
        <button id="eight" onClick={() => buttonPress("8")} className="primary">8</button>
        <button id="nine" onClick={() => buttonPress("9")} className="primary">9</button>
        <button id="negative" onClick={() => buttonPress("negative")} className="secondary">+/-</button>
        <button id="clear" onClick={() => buttonPress("clear")} className="ternary">AC</button>

        <button id="four" onClick={() => buttonPress("4")} className="primary">4</button>
        <button id="five" onClick={() => buttonPress("5")} className="primary">5</button>
        <button id="six" onClick={() => buttonPress("6")} className="primary">6</button>
        <button id="multiply" onClick={() => buttonPress("*")} className="secondary">*</button>
        <button id="divide" onClick={() => buttonPress("/")} className="secondary">/</button>

        <button id="one" onClick={() => buttonPress("1")} className="primary">1</button>
        <button id="two" onClick={() => buttonPress("2")} className="primary">2</button>
        <button id="three" onClick={() => buttonPress("3")} className="primary">3</button>
        <button id="add" onClick={() => buttonPress("+")} className="secondary">+</button>
        <button id="subtract" onClick={() => buttonPress("-")} className="secondary">-</button>

        <button id="zero" onClick={() => buttonPress("0")} className="primary">0</button>
        <button id="decimal" onClick={() => buttonPress(".")} className="primary">.</button>
        <button id="equals" onClick={() => buttonPress("=")} className="ternary">=</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
