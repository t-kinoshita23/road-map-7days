import React, { useState } from 'react';

const Step3CustomOperator: React.FC = () => {
  const [result, setResult] = useState<number>(0);

  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);

  const [operator1, setOperator1] = useState<string>('+');
  const [operator2, setOperator2] = useState<string>('+');

  const handleCalc = (a: number, b: number, c: number) => {
    console.log('数値 a:', a, '数値 b:', b, '数値 c:', c);
    console.log('operator1:', operator1, 'operator2:', operator2);

    const result = a + b + c; // 仮の計算式
    console.log('計算結果 result:', result);
    setResult(result);

    let resultAB: number;
    let finalResult: number;

    switch (operator1) {
      case '+':
        resultAB = a + b;
        break;
      case '-':
        resultAB = a - b;
        break;
      case '*':
        resultAB = a * b;
        break;
      case '/':
        resultAB = a / b;
        break;
      default:
        resultAB = a + b;
    }
    switch (operator2) {
      case '+':
        finalResult = resultAB + c;
        break;
      case '-':
        finalResult = resultAB - c;
        break;
      case '*':
        finalResult = resultAB * c;
        break;
      case '/':
        finalResult = resultAB / c;
        break;
      default:
        finalResult = resultAB + c;
    }
    setResult(finalResult);
  };

  return (
    <div>
      <h1>f式001：未来の売上予測</h1>
      <h2>
        四則演算記号を変えて計算できますが、計算順序ルール違反の可能性があります
      </h2>

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
      <p>注意：計算順序に注意してください。</p>
    </div>
  );
};

export default Step3CustomOperator;
