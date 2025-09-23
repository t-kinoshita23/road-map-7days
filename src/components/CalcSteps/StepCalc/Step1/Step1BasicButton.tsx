import React, { useState } from 'react';

const Step1BasicButton: React.FC = () => {
  const [result, setResult] = useState<number>(0);

  const handleCalc = () => {
    // 四則演算の例
    const a = 1200;
    const b = 0.85;
    const c = 300;
    const calcResult = (a + b) * c;
    setResult(calcResult);
  };

  return (
    <div>
      <h1>f式001：未来の売上予測</h1>
      <h2>ボタンを押すと計算結果が表示されます</h2>
      <button onClick={handleCalc}>計算する</button>
      <p>結果： {result}</p>
    </div>
  );
};

export default Step1BasicButton;
