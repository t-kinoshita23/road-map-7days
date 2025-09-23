import React, { useState } from 'react';

const Step2InputCalc: React.FC = () => {
  const [result, setResult] = useState<number>(0);

  const [a, setA] = useState<number>(0);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);

  const handleCalc = () => {
    const calcResult = (a + b) * c;
    setResult(calcResult);
  };

  return (
    <div>
      <h1>f式001：未来の売上予測</h1>
      <h2>数値をテキストボックスに入力して計算する。</h2>
      <input type="number" onChange={e => setA(Number(e.target.value))} />
      <input type="number" onChange={e => setB(Number(e.target.value))} />
      <input type="number" onChange={e => setC(Number(e.target.value))} />
      <button onClick={handleCalc}>計算する</button>
      <p>結果： {result}</p>
    </div>
  );
};

export default Step2InputCalc;
