import React, { useState } from 'react';

const Step4CustomOperator: React.FC = () => {
  const [result, setResult] = useState<number>(0);

  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);

  const [operator1, setOperator1] = useState<string>('+');
  const [operator2, setOperator2] = useState<string>('+');

  const getPrecedence = (op: string): number => {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    return 0;
  };

  const calculate = (x: number, op: string, y: number): number => {
    switch (op) {
      case '+':
        return x + y;
      case '-':
        return x - y;
      case '*':
        return x * y;
      case '/':
        return x / y;
      default:
        return x + y;
    }
  };

  const handleCalc = (a: number, b: number, c: number) => {
    const prec1 = getPrecedence(operator1);
    const prec2 = getPrecedence(operator2);

    let result: number;

    if (prec2 > prec1) {
      const temp = calculate(b, operator2, c);
      result = calculate(a, operator1, temp);
    } else {
      const temp = calculate(a, operator1, b);
      result = calculate(temp, operator2, c);
    }
    setResult(result);
  };

  return (
    <div>
      <h1>f式001：未来の相場予測</h1>
      <h2>四則演算記号を変えて計算できます</h2>
      <input type="number" onChange={e => setA(Number(e.target.value))} />

      <select value={operator1} onChange={e => setOperator1(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>

      <input type="number" onChange={e => setB(Number(e.target.value))} />

      <select value={operator2} onChange={e => setOperator2(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>

      <input type="number" onChange={e => setC(Number(e.target.value))} />

      <button onClick={() => handleCalc(a, b, c)}>計算する</button>
      <p>結果： {result}</p>
    </div>
  );
};

export default Step4CustomOperator;
