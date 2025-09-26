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

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();
//       if (error) {
//         console.error('ユーザー取得失敗:', error.message);
//         setMessage('ログイン情報の取得に失敗しました');
//         return;
//       }
//       if (user?.email) {
//         setUserEmail(user.email);
//       }
//     };
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchGenderOptions = async () => {
//       const { data, error } = await supabase.from('gender_options').select('*');
//       if (error) {
//         console.error('性別オプション取得失敗:', error.message);
//         setMessage('性別オプションの取得に失敗しました');
//       } else if (data && data.length > 0) {
//         setGenderOptions(data);
//       } else {
//         setMessage('性別オプションが空です');
//       }
//     };
//     fetchGenderOptions();
//   }, []);

//   const handleSubmit = async () => {
//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();
//     if (userError || !user) {
//       setMessage('ログインしていません');
//       return;
//     }

//     if (!genderCode || genderCode.trim() === '') {
//       setMessage('性別を選択してください');
//       return;
//     }

//     let avatarUrl = '';
//     if (selectedFile) {
//       try {
//         avatarUrl = await uploadAvatar(selectedFile, user.id);
//       } catch (uploadError) {
//         if (uploadError instanceof Error) {
//           setMessage(`画像アップロード失敗: ${uploadError.message}`);
//         } else {
//           setMessage('画像アップロード失敗（詳細不明）');
//         }
//         return;
//       }
//     }

//     const { error } = await supabase.from('profiles').upsert({
//       id: user.id,
//       name,
//       gender_code: genderCode,
//       avatar_url: avatarUrl,
//     });

//     if (error) {
//       setMessage(`登録エラー: ${error.message}`);
//     } else {
//       setMessage('プロフィール登録完了！');
//       navigate('/complete');
//     }
//   };

//   // アバター画像をアップロードする関数
//   const uploadAvatar = async (file: File, userId: string) => {
//     const { data, error } = await supabase.storage
//       .from('avatars')
//       .upload(`public/${userId}/${file.name}`, file, {
//         cacheControl: '3600',
//         upsert: true,
//       });
//     console.log('🧾 アップロード確認:', {
//       path: `public/${userId}/${file.name}`,
//       fileName: file.name,
//       fileSize: file.size,
//       fileType: file.type,
//       userId,
//       error,
//       data,
//     });

//     if (error) {
//       throw error;
//     }

//     const { data: urlData } = supabase.storage
//       .from('avatars')
//       .getPublicUrl(`public/${userId}/${file.name}`);

//     return urlData.publicUrl;
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
//       />
//       <select value={genderCode} onChange={e => setGenderCode(e.target.value)}>
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
//       />
//       <button onClick={handleSubmit}>登録する</button>
//       <p style={{ marginTop: '1rem', color: 'red' }}>{message}</p>
//     </div>
//   );
// }
