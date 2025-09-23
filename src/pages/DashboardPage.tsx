import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        navigate('/login'); // 未ログインならログインページへリダイレクト
      } else {
        setUserEmail(data.user.email ?? null); // ログイン済みならメール表示
        if (data.user.email) {
          setUserEmail(data.user.email);
        } else {
          setUserEmail(null);
        }
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>ダッシュボード</h2>
      {userEmail ? (
        <p>ようこそ、{userEmail} さん！</p>
      ) : (
        <p>ログイン状態を確認中...</p>
      )}
    </div>
  );
}
