import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordValid = /^[A-Za-z0-9]{8,}$/.test(password);
  const isFormValid = emailOrPhone.trim() !== '' && isPasswordValid;

  const handleRegister = async () => {
    if (!isPasswordValid) {
      setShowModal(true);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailOrPhone,
      password,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        setErrorMessage('このメールアドレスは既に使われています');
        return;
      }
    }

    navigate('/complete');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">新規登録</h1>

      <input
        type="text"
        value={emailOrPhone}
        onChange={e => setEmailOrPhone(e.target.value)}
        placeholder="Eメールまたは電話番号"
        className="border rounded px-4 py-2 w-full max-w-md mb-4"
      />

      {errorMessage && (
        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
      )}

      <div className="relative w-full max-w-md mb-2">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="パスワード"
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

      <p className="text-sm text-gray-600 mb-4">
        パスワードは英数字８桁以上で指定してください。
      </p>

      <button
        onClick={handleRegister}
        disabled={!isFormValid}
        className={`w-full max-w-md px-4 py-2 rounded ${
          isFormValid
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        新規登録
      </button>

      <p className="text-sm text-gray-500 mt-4">
        ※ 既に登録済みの方は必要ありません
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-blue-500 underline"
      >
        戻る
      </button>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white p-6 rounded shadow text-center">
            <p>英数字８桁で入力してください</p>
            <p className="text-sm text-gray-500 mt-2">
              どこでもタップで閉じます
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
