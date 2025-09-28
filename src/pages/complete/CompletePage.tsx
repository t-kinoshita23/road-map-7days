import { useNavigate } from 'react-router-dom';
import ProfileFormPage from '../register/ProfileFormPage';
import { supabase } from '../../lib/supabaseClient';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

type Profile = {
  id: string;
  name: string;
  age?: number;
  // 他のフィールド
};

export default function CompletePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');

  const profileData = (ProfileFormPage as any).profile; // ProfileFormPageからprofileデータを取得

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        setMessage('ログイン情報の取得に失敗しました');
        return;
      }
      setUser(user);
      console.log('現在のユーザーID:', user.id);

      // Supabaseの戻り値に型を明示的に指定
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single<Profile>();
      console.log('ここのユーザーID:', user.id);
      console.log('取得したプロフィール情報:', data);

      if (error || !data) {
        setMessage('プロフィール情報が見つかりません');
        return;
      }

      setProfile(data);
    };

    fetchUserAndProfile();
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div>
        <h2>登録完了！</h2>
        <p>ログイン出来ています</p>
        <p>⑤ CompletePage.tsx</p>
        <h3>ここからはじめよう！</h3>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <div>
          <h3>🔏 Auth User Info</h3>
        </div>
        {user ? (
          <ul>
            <li>
              <strong>ID:</strong> {user.id}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
          </ul>
        ) : (
          <p>ユーザー情報を取得中…</p>
        )}
      </div>

      <div>
        <h3>📄 Profile Info from Supabase</h3>
        {profile ? (
          <>
            <ul>
              <li>
                <strong>ID:</strong> {profile.id}
              </li>
              <li>
                <strong>Name:</strong> {profile.name}
              </li>
              {profile.age && (
                <li>
                  <strong>Age:</strong> {profile.age}
                </li>
              )}
            </ul>
          </>
        ) : (
          <p>プロフィール情報を取得中…</p>
        )}
      </div>

      <button
        onClick={() =>
          navigate('/profileviews', {
            state: { profileData },
          })
        }
      >
        プロフィールを確認する
      </button>
      <button onClick={() => navigate('/')}>エントランス</button>
    </div>
  );
}
