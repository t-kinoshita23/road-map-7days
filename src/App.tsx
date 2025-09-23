import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProfileFormPage from './pages/ProfileFormPage';
import CompletePage from './pages/CompletePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfileFormPage />} />
        <Route path="/complete" element={<CompletePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
