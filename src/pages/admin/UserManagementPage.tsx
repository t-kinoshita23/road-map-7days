import { AdminUserList } from '@/jobs/admin/AdminUserList';

export const UserManagementPage = () => {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>ユーザー管理</h1>
      <p>登録ユーザーの一覧と操作を行えます。</p>

      {/* 今後追加予定の操作ボタン */}
      {/* <button>新規追加</button> */}

      <button onClick={() => console.log('新規ユーザー追加')}>
        新規ユーザー追加
      </button>
      <AdminUserList />
    </main>
  );
};

export default UserManagementPage;
