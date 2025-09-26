import { useNavigate } from 'react-router-dom';

export default function CompletePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h2>登録完了！</h2>
      <p>ログインできました</p>
      <h3>ここからはじめよう！</h3>
      <button onClick={() => navigate('/profileviews')}>
        プロフィールを確認する
      </button>
      <button onClick={() => navigate('/')}>ユーザー変更</button>
    </div>
  );
}
