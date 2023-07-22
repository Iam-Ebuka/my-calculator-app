import logo from './logo.svg';
import './App.css'; 
import { useState } from 'react';

function App() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['*','/','+','-','.'];

  

  const updateCalc = value => {
    if (value == '0') {
      let calcValues = calc.split(/[+\-*\/]/);
      let lastValue = calcValues[calcValues.length - 1];
      let firstChar = lastValue[0];
      if (firstChar == "0" && !lastValue[1]) {
        return;
      }

    }
    if (value !== '0' && value !== '.') {
      let calcValues = calc.split(/[+\-*\/]/);
      let lastValue = calcValues[calcValues.length - 1];
      let firstChar = lastValue[0];
      if (firstChar == '0' && !lastValue[1]) {
        return setCalc(calc.replace(/\d$/,value));
      }
    }
    if (value === '.') {
      let calcValues = calc.split(/[+\-*\/]/);
      let lastValue = calcValues[calcValues.length - 1];
      if (lastValue.includes('.')) {
        return;
      } else {
        return setCalc(calc + value);
      }
    }
    if (value === '-' && calc === '') {
      return setCalc(value);
    }
    if (calc.slice(-1) === '-' && ops.includes(value)) {
      return;
    }
    if (ops.includes(value) && calc === '-') {
      return;
    }
    if (
        ops.includes(value) && calc === ''
      ) {
      return;
    } 
    if (value === '-' && calc.slice(-1) === '-') {
      return;
    }
    if (value === '-' && ops.includes(calc.slice(-1))) {
      return setCalc(calc + value);
    } 
    if (ops.includes(value) && ops.includes(calc.slice(-1))) {
      return setCalc(calc.replace(/\D$/g,value));
      }   
    setCalc(calc + value);



    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  }

  const handleEquals = () => {
    let total = eval(calc)!== Math.round(eval(calc)) ? 
    eval(calc).toFixed(4).toString() 
    : eval(calc).toString();
    setCalc(total);
  }
 
  const createDigits = () => {
    const digits = [];
    let numAlpha = ["n","one","two","three","four","five","six","seven","eight","nine"];
    for (let i = 1;i < 10; i++) {
      digits.push(
        <button 
        key={i} 
        id={numAlpha[i]}
        onClick={() => updateCalc( i.toString())}>
        {i}
        </button>
      )
    } 
   return digits;
  }

  const handleClear = () => {
    if (calc == '') {
      return;
    }
    let value = '';
    setCalc(value);
    setResult(value);
  }

  const deleteLast = () => {
    if (calc == '') {
      return;
    }
    let value = calc.slice(0, -1);
    setCalc(value);
  }
   


  return (
    <div className="App">
      <div className="calculator">
        <div className="display" id="display">
          {result? <span>({result})</span>: " "}&nbsp; 
          {calc === '' ? 0 : calc}
        </div>

        <div className="operators">
          <button id="divide" onClick={() => updateCalc('/')}>/</button>
          <button id="multiply" onClick={() => updateCalc('*')}>*</button>
          <button id="add" onClick={() => updateCalc('+')}>+</button>
          <button id="subtract" onClick={() => updateCalc('-')}>-</button>

          <button onClick={ deleteLast }>DEL</button>
          <button id="clear" onClick={ handleClear }>AC</button>
        </div>
        <div className='digit'>
          { createDigits() }
          <button id="zero" onClick={() => updateCalc('0')}>0</button>
          <button id="decimal" onClick={() => updateCalc('.')}>.</button>
          <button id="equals" onClick={ handleEquals }>=</button>
        </div>

      </div>
    </div>
  );
}

export default App;
