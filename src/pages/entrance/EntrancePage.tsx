// EntrancePage.tsx
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useEffect } from 'react';
import { useState } from 'react';

export default function EntrancePage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('');

  const [emailOrPhone, setEmailOrPhone] = useState('');

  const isFormValid = emailOrPhone !== '' && password !== '';
  console.log('フォームの有効性:', isFormValid);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!isFormValid) return;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailOrPhone,
      password,
    });

    if (error) {
      if (error.message.includes('User already registered')) {
        setModalMessage('そのEメールはすでに使われています');
      } else {
        setModalMessage('アカウントまたはパスワードが違います');
      }
      setShowModal(true);
      return;
    }

    navigate('/complete'); // completeページへ遷移
  };
  console.log('モーダル状態:', showModal);

  const handleRegister = async () => {
    await supabase.auth.signOut(); // ← 前回のユーザーをクリア
    navigate('/new_login'); // 新規登録ページへ遷移
  };

  useEffect(() => {
    console.log('🟢 EntrancePageが表示されました');
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        console.error('潜伏ユーザー発見:', user.email);
      } else {
        console.log('ログインしていません');
      }
    };

    checkUser();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 className="text-2xl font-bold mb-4">アプリをはじめます</h1>
      <p className="text-sm text-gray-600 mb-4">
        1. EntrancePage.tsx は最初の入口。ログインボタンと新規登録ボタンがある。
      </p>

      <input
        type="text"
        value={emailOrPhone}
        onChange={e => setEmailOrPhone(e.target.value)}
        placeholder="Eメールアドレスまたは電話番号"
        className="border rounded px-4 py-2 w-full mb-4"
      />

      <div className="relative mb-4">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="パスワード"
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-4 py-2 w-full"
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          👁️
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={!isFormValid}
        className={`w-full px-4 py-2 rounded md-4 ${
          isFormValid
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        ログイン
      </button>

      <label className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" />
        次回から自動でログイン：
      </label>

      <p className="text-sm text-gray-600 mb-4">
        ※ はじめての方は新規登録をクリック
      </p>

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hober:bg-blue-600 mb-4"
      >
        アカウント新規
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white p-6 rounded shadow text-center">
            <p>{modalMessage}</p>
            <div className="text-sm text-gray-500 mt-2">
              どこでもタップで閉じます
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
