import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Profile } from '@/jobs/admin/types';
import type { User } from '@supabase/supabase-js'; // ← 追加

export const useAdminUsers = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('fetchUsers 実行開始');
      setLoading(true);
      setError(null);
      console.log('読み込み中？', loading);
      // ① ログイン中のユーザー情報を取得
      const { data: authUser, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authUser) {
        setError(authError?.message ?? 'ユーザー情報が取得できません');
        setLoading(false);
        return;
      }

      if (authUser?.user) {
        const user = authUser.user; // ✅ 型を明示
        setCurrentUserId(authUser.user.id);
      }

      // ② ログイン中のユーザーの role を取得
      const { data: profileUser, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authUser.user.id)
        .single();

      if (profileError || !profileUser) {
        setError(profileError?.message ?? 'プロフィール情報が取得できません');
        setLoading(false);
        return;
      }

      setCurrentUserRole(profileUser.role);

      // ③ 全ユーザー一覧を取得
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, age, role, gender_code, email, avatar_url');

      if (error) setError(error.message);
      else setUsers(data ?? []);
      setLoading(false);
      console.log(data);
    };

    fetchUsers();
  }, []);

  return { users, loading, error, currentUserId, currentUserRole };
};
