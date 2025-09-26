// import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabaseClient';
// import { useNavigate } from 'react-router-dom';

// export default function ProfileFormPage() {
//   const [name, setName] = useState('');
//   const [genderCode, setGenderCode] = useState('');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [genderOptions, setGenderOptions] = useState<
//     { code: string; label: string }[]
//   >([]);
//   const [message, setMessage] = useState('');
//   const [userEmail, setUserEmail] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false); // ローディング状態を追加

//   const navigate = useNavigate();

//   // ユーザー情報と性別オプションの取得は変更なし
//   useEffect(() => {
//     const fetchUser = async () => {
//       // ...
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchGenderOptions = async () => {
//       // ...
//     };
//     fetchGenderOptions();
//   }, []);

//   // アバター画像をアップロードする関数 (ファイル名をユニークにする)
//   const uploadAvatar = async (file: File, userId: string) => {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${Date.now()}.${fileExt}`; // タイムスタンプでユニークに
//     const filePath = `public/${userId}/${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from('avatars')
//       .upload(filePath, file, { upsert: false }); // 同じパスならエラーにする場合はfalse

//     if (uploadError) {
//       throw uploadError;
//     }

//     const { data: urlData } = supabase.storage
//       .from('avatars')
//       .getPublicUrl(filePath);
//     return urlData.publicUrl;
//   };

//   // handleSubmit関数を修正してローディング状態を管理
//   const handleSubmit = async () => {
//     // --- バリデーションをここで行う ---
//     if (!name.trim()) {
//       setMessage('名前を入力してください');
//       return; // ローディングを開始する前に処理を中断
//     }
//     if (!genderCode) {
//       setMessage('性別を選択してください');
//       return; // ローディングを開始する前に処理を中断
//     }
//     setLoading(true);
//     setMessage('');

//     try {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();
//       if (userError || !user) {
//         throw new Error('ログイン情報を確認できませんでした。');
//       }

//       if (!name.trim()) {
//         setMessage('名前を入力してください');
//         return;
//       }

//       if (!genderCode) {
//         setMessage('性別を選択してください');
//         return;
//       }

//       let avatarUrl = '';
//       if (selectedFile) {
//         avatarUrl = await uploadAvatar(selectedFile, user.id);
//       }

//       const { error: upsertError } = await supabase.from('profiles').upsert({
//         id: user.id,
//         name: name.trim(),
//         gender_code: genderCode,
//         avatar_url: avatarUrl,
//       });

//       // DB登録に失敗した場合はエラーを投げる
//       if (upsertError) {
//         throw upsertError;
//       }

//       // 遷移先で完了メッセージを表示
//       navigate('/complete', {
//         state: { message: 'プロフィール登録が完了しました！' },
//       });
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : '不明なエラーが発生しました';
//       setMessage(`エラー: ${errorMessage}`);
//     } finally {
//       setLoading(false); // 成功・失敗問わずローディングを解除
//     }
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>プロフィール登録</h2>
//       {userEmail && <p>ログイン中：{userEmail}</p>}
//       <input
//         type="text"
//         placeholder="名前"
//         value={name}
//         onChange={e => setName(e.target.value)}
//         disabled={loading} // ローディング中は無効化
//       />
//       <select
//         value={genderCode}
//         onChange={e => setGenderCode(e.target.value)}
//         disabled={loading}
//       >
//         <option value="">性別を選択</option>
//         {genderOptions.map(opt => (
//           <option key={opt.code} value={opt.code}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={e => {
//           const file = e.target.files?.[0];
//           if (file) {
//             setSelectedFile(file);
//           }
//         }}
//         disabled={loading}
//       />
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? '登録中...' : '登録する'}
//       </button>
//       {message && <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>}
//     </div>
//   );
// }
