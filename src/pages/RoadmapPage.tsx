import './App.css';
import Step1BasicButton from '../components/CalcSteps/StepCalc/Step1/Step1BasicButton';
import Step2InputCalc from '../components/CalcSteps/StepCalc/Step2/Step2InputCalc';
import Step3CustomOperator from '../components/CalcSteps/StepCalc/Step3/Step3CustomOperator';
import Step4CustomOperator from '../components/CalcSteps/StepCalc/Step4/Step4CustomOperator';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>学習ロードマップ</h1>
      </div>

      <nav>
        <div className="tooltip">
          <Link to="/step1" className="mr-4">
            [ Step 1 ]
          </Link>
          <span className="tooltip-text">はじめは</span>
        </div>
        <div className="tooltip">
          <Link to="/step2" className="mr-4">
            [ Step 2 ]
          </Link>
          <span className="tooltip-text">ここでも</span>
        </div>
        <div className="tooltip">
          <Link to="/step3" className="mr-4">
            [ Step 3 ]
          </Link>
          <span className="tooltip-text">失敗した四則演算</span>
        </div>

        <div className="tooltip">
          <Link to="/step4" className="mr-4">
            [ Step 4 ]
          </Link>
          <span className="tooltip-text">カスタム四則演算</span>
        </div>
      </nav>

      <Routes>
        <Route path="/step1" element={<Step1BasicButton />} />
        <Route path="/step2" element={<Step2InputCalc />} />
        <Route path="/step3" element={<Step3CustomOperator />} />
        <Route path="/step4" element={<Step4CustomOperator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
