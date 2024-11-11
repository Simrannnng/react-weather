import React, { useState } from 'react';
import "./App.css";

const App = () => {
  const [result, setResult] = useState("");

  const handleClick = (e) => setResult(result.concat(e.target.name));
  const clearResult = () => setResult("");
  const backspace = () => setResult(result.slice(0, -1));

  const calculate = () => {
    try {
      const sanitizedResult = evaluateExpression(result);
      setResult(sanitizedResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const evaluateExpression = (expression) => {
    const tokens = expression.match(/(\d+\.?\d*|\+|-|\*|\/)/g);
    
    if (!tokens) throw new Error("Invalid expression");

    let stack = [];
    let currentOperator = null;

    tokens.forEach((token) => {
      if (!isNaN(token)) {
        let num = parseFloat(token);
        if (currentOperator) {
          let prevNum = stack.pop();
          switch (currentOperator) {
            case "+":
              num = prevNum + num;
              break;
            case "-":
              num = prevNum - num;
              break;
            case "*":
              num = prevNum * num;
              break;
            case "/":
              num = prevNum / num;
              break;
            default:
              throw new Error("Invalid operator");
          }
          currentOperator = null;
        }
        stack.push(num);
      } else {
        currentOperator = token;
      }
    });

    if (stack.length === 1) {
      return stack[0];
    } else {
      throw new Error("Error evaluating expression");
    }
  };

  return (
    <div className="app">
      <h1 className="title">Calculator</h1>
      <div className="container">
        <form>
          <input type="text" value={result} readOnly />
        </form>
        <div className="keypad">
          <button className="clear highlight" onClick={clearResult}>Clear</button>
          <button className="backspace highlight" onClick={backspace}>C</button>
          <button onClick={handleClick} name="/" className="highlight">&divide;</button>
          <button onClick={handleClick} name="7">7</button>
          <button onClick={handleClick} name="8">8</button>
          <button onClick={handleClick} name="9">9</button>
          <button onClick={handleClick} name="*" className="highlight">&times;</button>
          <button onClick={handleClick} name="4">4</button>
          <button onClick={handleClick} name="5">5</button>
          <button onClick={handleClick} name="6">6</button>
          <button onClick={handleClick} name="-" className="highlight">&ndash;</button>
          <button onClick={handleClick} name="1">1</button>
          <button onClick={handleClick} name="2">2</button>
          <button onClick={handleClick} name="3">3</button>
          <button onClick={handleClick} name="+" className="highlight">+</button>
          <button onClick={handleClick} name="0">0</button>
          <button onClick={handleClick} name=".">.</button>
          <button className="result" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
