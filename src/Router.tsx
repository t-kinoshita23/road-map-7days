import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileFormPage from './pages/register/ProfileFormPage';
import ProfileViews from './pages/users/profileviews/ProfileViews.tsx';
import CompletePage from './pages/complete/CompletePage';
import EntrancePage from './pages/entrance/EntrancePage';
import LoginPage from './pages/new_login/LoginPage';

// EntrancePage.tsx は最初の入口。ログインボタンと新規登録ボタンがある。
// ProfileFormPage.tsx はプロフィール登録・主にログイン時に追加していない項目を追加するページ
// ProfilePage.tsx はプロフィール表示・内容確認・編集ページに遷移可能とする
// CompletePage.tsx :登録完了ページ。ここから本格的なアプリをはじめよう！
// LoginPage.tsx :新規登録専用ページ
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntrancePage />} />
        <Route path="/complete" element={<CompletePage />} />
        <Route path="/profileviews" element={<ProfileViews />} />
        <Route path="/register" element={<ProfileFormPage />} />
        <Route path="/new_login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
