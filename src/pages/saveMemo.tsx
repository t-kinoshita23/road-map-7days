// import { useEffect, useState } from 'react';
// import { supabase } from '../lib/supabaseClient';

// export default function ProfileFormPage() {
//   const [userEmail, setUserEmail] = useState('');
//   const [genderCode, setGenderCode] = useState('');
//   const [genderOptions, setGenderOptions] = useState<
//     { code: string; label: string }[]
//   >([]);
//   const [message, setMessage] = useState('');
//   const [profile, setProfile] = useState<any>(null);

//   // ① ユーザー情報の取得
//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//         error,
//       } = await supabase.auth.getUser();
//       if (error || !user) {
//         console.error('ユーザー取得失敗:', error?.message);
//         setMessage('ログイン情報の取得に失敗しました');
//         return;
//       }
//       setUserEmail(user.email);

//       // ② プロフィール情報の取得
//       const { data: profileData, error: profileError } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', user.id)
//         .single();

//       if (profileError) {
//         console.error('プロフィール取得失敗:', profileError.message);
//         setMessage('プロフィール情報の取得に失敗しました');
//         return;
//       }
//       setProfile(profileData);
//     };

//     fetchUser();
//   }, []);

//   // ③ 性別オプションの取得
//   useEffect(() => {
//     const fetchGenderOptions = async () => {
//       const { data, error } = await supabase.from('gender_options').select('*');
//       if (error) {
//         console.error('性別オプション取得失敗:', error.message);
//         setMessage('性別オプションの取得に失敗しました');
//         return;
//       }
//       if (data && data.length > 0) {
//         setGenderOptions(data);
//       } else {
//         setMessage('性別オプションが空です');
//       }
//     };

//     fetchGenderOptions();
//   }, []);

//   // ④ genderOptionsとprofileが揃ったら性別コードをセット
//   useEffect(() => {
//     if (genderOptions.length > 0 && profile?.gender) {
//       setGenderCode(profile.gender);
//     }
//   }, [genderOptions, profile]);

//   // JSXなどはこの下に続く…
// }
