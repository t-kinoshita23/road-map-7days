import type { Profile } from '@/jobs/admin/types';

type Props = {
  user: Profile;
};

export const AdminUserCard = ({ user }: Props) => {
  const genderLabel =
    user.gender_code === 'male'
      ? '男性'
      : user.gender_code === 'female'
      ? '女性'
      : '未登録';

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      <p>
        <strong>名前:</strong> {user.name}
      </p>
      <p>
        <strong>性別:</strong> {user.gender_code ?? '未登録'}
      </p>
      <p>
        <strong>年齢:</strong> {user.age ?? '未登録'}
      </p>
      <p>
        <strong>ロール:</strong> {user.role}
      </p>
      <p>
        <strong>Eメール:</strong> {user.email ?? '未登録'}
      </p>

      {user.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={`${user.name}の写真`}
          style={{ width: '150px', borderRadius: '50%' }}
        />
      ) : (
        <p>アバター画像は未登録です。</p>
      )}
      {/* 操作ボタンは後で追加 */}
    </div>
  );
};
export default AdminUserCard;
