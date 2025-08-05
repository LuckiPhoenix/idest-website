export interface User {
  id: string;
  full_name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: User;
}