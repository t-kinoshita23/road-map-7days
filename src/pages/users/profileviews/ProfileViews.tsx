import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// 型定義（コンポーネントの外側）
type Profile = {
  id: string;
  name: string;
  age: number | null;
  gender_code: string;
  avatar_url: string;
  role: string;
};

const ProfileViews = ({ profile }: { profile: Profile | null }) => {
  const navigate = useNavigate();
  const isAdmin = profile?.role === 'admin';
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        setMessage('ログイン情報の取得に失敗しました');
        return;
      }
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

    fetchProfile();
  }, []);

  const uploadAvatar = async (file: File, userId: string) => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`public/${userId}/${file.name}`, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(`public/${userId}/${file.name}`);

    return urlData.publicUrl;
  };

  const handleUpdate = async () => {
    if (!profile) {
      setMessage('プロフィール情報がありません');
      return;
    }

    let avatarUrl = profile.avatar_url;

    if (selectedFile) {
      try {
        avatarUrl = await uploadAvatar(selectedFile, profile.id);
      } catch (uploadError) {
        if (uploadError instanceof Error) {
          setMessage(`画像アップロード失敗: ${uploadError.message}`);
        } else {
          setMessage('画像アップロード失敗（詳細不明）');
        }
        return;
      }
    }

    const { error } = await supabase
      .from('profileviews')
      .update({
        name: profile?.name ?? '',
        gender_code: profile?.gender_code ?? '',
        avatar_url: avatarUrl, // ← 画像アップロード後に取得したURL
      })
      .eq('id', profile.id);

    if (error) {
      setMessage(`更新失敗: ${error.message}`);
    } else {
      setMessage('プロフィールを更新しました');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>プロフィール情報</h2>
      <h3>名前: {profile?.name}さん</h3>
      <p>④ProfileViews.tsxはプロフィール情報を表示するページです。</p>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {profile && (
        <div>
          {/* 名前 */}
          <div style={{ marginBottom: '1rem' }}>
            <label>名前：</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
              />
            ) : (
              <span>{profile.name}</span>
            )}
          </div>

          {/* 性別 */}
          <div style={{ marginBottom: '1rem' }}>
            <label>性別：</label>
            <span>{profile.gender_code}</span>
          </div>

          {/* 画像 */}
          <div style={{ marginBottom: '1rem' }}>
            <label>プロフィール画像：</label>
            <br />
            <img
              src={profile.avatar_url}
              alt="プロフィール画像"
              style={{ width: '150px', borderRadius: '8px' }}
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                  }
                }}
              />
            )}
          </div>

          {/* 編集ボタン */}
          <button onClick={() => navigate('/profile/editor')}>編集</button>

          {/* CompletePageへの戻るボタン */}
          <button onClick={() => navigate('/complete')}>ホームへ戻る</button>
          <p>あなたのステータス：{profile?.role}</p>
          {profile?.role === 'admin' && (
            <button onClick={() => navigate('/admin/users')}>
              管理ページへ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
