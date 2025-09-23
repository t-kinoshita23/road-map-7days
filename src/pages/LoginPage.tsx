import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleAuth = async () => {
    let result;
    if (isSignUp) {
      result = await supabase.auth.signUp({ email, password });

      // サインアップ後にログイン処理を追加
      if (!result.error) {
        await supabase.auth.signInWithPassword({ email, password });
      }
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    const { error } = result;
    if (error) {
      setMessage(error.message);
      return;
    }

    // ログイン後にプロフィール登録済みか確認
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setMessage('ログイン情報の取得に失敗しました');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (profile) {
      navigate('/complete'); // 登録済み → 完了ページへ
    } else {
      navigate('/profile'); // 未登録 → プロフィール登録ページへ
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{isSignUp ? '新規登録' : 'ログイン'}</h2>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>
        {isSignUp ? '登録する' : 'ログインする'}
      </button>
      <p style={{ marginTop: '1rem' }}>{message}</p>
      <button
        onClick={() => setIsSignUp(!isSignUp)}
        style={{ marginTop: '1rem' }}
      >
        {isSignUp ? 'ログイン画面へ' : '新規登録へ'}
      </button>
    </div>
  );
}
