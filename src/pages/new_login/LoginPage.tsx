import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { AuthError } from '@supabase/supabase-js';

interface FormState {
  emailOrPhone: string;
  password: string;
  showPassword: boolean;
  showModal: boolean;
  errorMessage: string;
  isLoading: boolean;
}

export default function LoginPage() {
  const [formState, setFormState] = useState<FormState>({
    emailOrPhone: '',
    password: '',
    showPassword: false,
    showModal: false,
    errorMessage: '',
    isLoading: false,
  });

  const navigate = useNavigate();

  // パスワード検証（英数字8桁以上、記号も許可）
  const isPasswordValid = (password: string): boolean => {
    return password.length >= 8;
  };

  // メールアドレスの簡単な検証
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    formState.emailOrPhone.trim() !== '' &&
    isEmailValid(formState.emailOrPhone) &&
    isPasswordValid(formState.password);

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const handleAuthError = (error: AuthError) => {
    console.error('認証エラー:', error);

    // Supabaseの具体的なエラーコードを使用
    switch (error.message) {
      case 'User already registered':
        return 'このメールアドレスは既に使われています';
      case 'Invalid email':
        return 'メールアドレスの形式が正しくありません';
      case 'Password should be at least 6 characters':
        return 'パスワードは6文字以上である必要があります';
      default:
        return '登録に失敗しました。もう一度お試しください。';
    }
  };

  const handleRegister = async () => {
    if (!isPasswordValid(formState.password)) {
      updateFormState({ showModal: true });
      return;
    }

    updateFormState({
      isLoading: true,
      errorMessage: '',
    });

    try {
      // 新規登録処理
      const { data, error } = await supabase.auth.signUp({
        email: formState.emailOrPhone,
        password: formState.password,
      });

      if (error) {
        updateFormState({
          errorMessage: handleAuthError(error),
          isLoading: false,
        });
        return;
      }

      if (!data?.user) {
        updateFormState({
          errorMessage: '登録に失敗しました',
          isLoading: false,
        });
        return;
      }

      // プロフィール情報を profiles テーブルに保存
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email: formState.emailOrPhone,
      });

      if (profileError) {
        console.error('プロフィール保存エラー:', profileError);
        // プロフィール保存エラーでも登録完了画面に遷移
        // （バックグラウンドで修正可能なため）
      }

      navigate('/complete');
    } catch (error) {
      console.error('予期しないエラー:', error);
      updateFormState({
        errorMessage: '予期しないエラーが発生しました',
        isLoading: false,
      });
    }
  };

  const togglePasswordVisibility = () => {
    updateFormState({ showPassword: !formState.showPassword });
  };

  const closeModal = () => {
    updateFormState({ showModal: false });
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 className="text-2xl font-bold mb-6">新規登録</h1>

      <input
        type="email"
        value={formState.emailOrPhone}
        placeholder="メールアドレス"
        onChange={e =>
          updateFormState({
            emailOrPhone: e.target.value,
            errorMessage: '', // 入力時にエラーメッセージをクリア
          })
        }
        className="border rounded px-4 py-2 w-full max-w-md mb-4"
        disabled={formState.isLoading}
      />

      {formState.errorMessage && (
        <p className="text-red-500 text-sm mb-2">{formState.errorMessage}</p>
      )}

      <div className="relative w-full max-w-md mb-2">
        <input
          type={formState.showPassword ? 'text' : 'password'}
          value={formState.password}
          placeholder="パスワード"
          onChange={e => updateFormState({ password: e.target.value })}
          className="border rounded px-4 py-2 w-full"
          disabled={formState.isLoading}
        />
        <button
          type="button"
          className="absolute right-3 top-2 text-gray-600"
          onClick={togglePasswordVisibility}
          disabled={formState.isLoading}
        >
          {formState.showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        パスワードは8文字以上で入力してください。
      </p>

      <button
        onClick={handleRegister}
        disabled={!isFormValid || formState.isLoading}
        className={`w-full max-w-md px-4 py-2 rounded transition-colors ${
          isFormValid && !formState.isLoading
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {formState.isLoading ? '登録中...' : '新規登録'}
      </button>

      <p className="text-sm text-gray-500 mt-4">
        ※ 既に登録済みの方は必要ありません
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-blue-500 underline"
        disabled={formState.isLoading}
      >
        戻る
      </button>

      {formState.showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded shadow text-center"
            onClick={e => e.stopPropagation()} // モーダル内クリックで閉じないように
          >
            <p>パスワードは8文字以上で入力してください</p>
            <p className="text-sm text-gray-500 mt-2">外側をタップで閉じます</p>
            <button
              onClick={closeModal}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
