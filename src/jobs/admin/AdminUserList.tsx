import { useAdminUsers } from './useAdminUsers';
import { AdminUserCard } from './AdminUserCard';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export const AdminUserList = () => {
  const { users, loading, error, currentUserId, currentUserRole } =
    useAdminUsers();

  const navigate = useNavigate();

  console.log('ログイン中のID:', currentUserId);
  console.log('ログイン中のロール:', currentUserRole);

  if (loading) return <p>読み込み中…</p>;
  if (error) return <p>エラー: {error}</p>;

  console.log('ユーザー数:', users.length);

  return (
    <div>
      <h2>ユーザー一覧</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}（ID: {user.id}）
          </li>
        ))}
      </ul>
      {users.map(user => {
        return <AdminUserCard key={user.id} user={user} />;
      })}
      <button onClick={() => navigate('/complete')}>アプリへ戻る</button>
    </div>
  );
};
