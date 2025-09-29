// src/jobs/registration/useProfile.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { PostgrestError } from '@supabase/supabase-js';
import type { Profile } from '../admin/types'; // Profile型をインポート}

export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, age, role')
        .eq('id', userId)
        .single();
      if (error) setError(error);
      else setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [userId]);

  const updateProfile = async (updates: Partial<Profile>) => {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
    if (!error) return;
    else setProfile({ ...(profile ?? ({} as Profile)), ...updates });
  };

  return { profile, loading, error, updateProfile };
};
