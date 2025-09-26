import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';

export default function ProfileFormPage() {
  const [name, setName] = useState('');
  const [genderCode, setGenderCode] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [genderOptions, setGenderOptions] = useState<
    { code: string; label: string }[]
  >([]);
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // ローディング状態を追加

  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);

  // ① ユーザー情報の取得
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error || !user) {
        console.error('ユーザー取得失敗:', error?.message);
        setMessage('ログイン情報の取得に失敗しました');
        return;
      }
      if (user.email) setUserEmail(user.email);

      // ② プロフィール情報の取得
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('プロフィール取得失敗:', profileError.message);
        setMessage('プロフィール情報の取得に失敗しました');
        return;
      }
      setProfile(profileData);
    };
    fetchUser();
  }, []);

  // ③ 性別オプションの取得
  useEffect(() => {
    const fetchGenderOptions = async () => {
      const { data, error } = await supabase.from('gender_options').select('*');
      if (error) {
        console.error('性別オプション取得失敗:', error.message);
        setMessage('性別オプションの取得に失敗しました');
        return;
      }
      if (data && data.length > 0) {
        setGenderOptions(data);
      } else {
        setMessage('性別オプションが空です');
      }
    };
    fetchGenderOptions();
  }, []);

  // ④ genderOptionsとprofileが揃ったら性別コードをセット
  useEffect(() => {
    if (genderOptions.length > 0 && profile?.gender) {
      setGenderCode(profile.gender);
    }
  }, [genderOptions, profile]);

  // アバター画像をアップロードする関数 (ファイル名をユニークにする)
  const uploadAvatar = async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`; // タイムスタンプでユニークに
    const filePath = `public/${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: false }); // 同じパスならエラーにする場合はfalse

    if (uploadError) {
      throw uploadError;
    }

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);
    return urlData.publicUrl;
  };

  // handleSubmit関数を修正してローディング状態を管理
  const handleSubmit = async () => {
    // --- バリデーションをここで行う ---
    if (!name.trim()) {
      setMessage('名前を入力してください');
      return; // ローディングを開始する前に処理を中断
    }
    if (!genderCode || genderCode.trim() === '') {
      setMessage('性別を選択してください');
      return; // ローディングを開始する前に処理を中断
    }
    setLoading(true);
    setMessage('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error('ログイン情報を確認できませんでした。');
      }

      let avatarUrl = '';
      if (selectedFile) {
        avatarUrl = await uploadAvatar(selectedFile, user.id);
      }

      const { error: upsertError } = await supabase.from('profiles').upsert({
        id: user.id,
        name: name.trim(),
        gender_code: genderCode,
        avatar_url: avatarUrl,
      });

      // DB登録に失敗した場合はエラーを投げる
      if (upsertError) {
        throw upsertError;
      }

      // 遷移先で完了メッセージを表示
      navigate('/profileviews', {
        state: { message: 'プロフィール登録が完了しました！' },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '不明なエラーが発生しました';
      setMessage(`エラー: ${errorMessage}`);
    } finally {
      setLoading(false); // 成功・失敗問わずローディングを解除
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>プロフィール登録</h2>
      {userEmail && <p>ログイン中：{userEmail}</p>}
      <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading} // ローディング中は無効化
      />
      <select
        value={genderCode}
        onChange={e => setGenderCode(e.target.value)}
        disabled={loading}
      >
        <option value="">性別を選択</option>
        {genderOptions.map(opt => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedFile(file);
          }
        }}
        disabled={loading}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? '登録中...' : '登録する'}
      </button>
      {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
    </div>
  );
}
