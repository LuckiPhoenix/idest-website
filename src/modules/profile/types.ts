import { Role } from '@/shared/types/role.enum'

export interface UserProfile {
  id: string
  full_name: string
  email: string
  role: Role
  avatar_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
  StudentProfile?: StudentProfile
  TeacherProfile?: TeacherProfile
}

export interface StudentProfile {
  user_id: string
  target_score: number
  current_level: string
  user: UserProfile 
}

export interface TeacherProfile {
  user_id: string
  degree: string
  specialization: string
  bio: string
  user: UserProfile
}

export interface UserDetailsResponse {
  full_name: string
  email: string
  avatar_url?: string
  role: string
}

export interface UserListItem {
  id: string
  full_name: string
  email: string
  role: string
  is_active: boolean
  created_at: string
}

export interface AvatarUploadResponse {
  imageUrl: string
  imagePublicId: string
}