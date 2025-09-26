// import { useState } from 'react';
// import { supabase } from '../lib/supabaseClient';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async () => {
//     const { error } = await supabase.auth.signInWithOtp({ email });
//     setMessage(error ? error.message : 'ログイン成功');
//   };

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>ログイン</h2>
//       <input
//         type="email"
//         placeholder="メールアドレス"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       />
//       <button onClick={handleLogin}>ログインリンク送信</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
