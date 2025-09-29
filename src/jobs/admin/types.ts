// src/jobs/registration/types.ts
export type Profile = {
  id: string;
  name: string;
  gender_code?: string;
  age?: number;
  role: string; // 例: 'user', 'admin'
  // 他にも必要なフィールドがあれば追加
  email?: string;
  avatar_url?: string;
};
