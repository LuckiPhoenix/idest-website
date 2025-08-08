import { StudentProfile, TeacherProfile } from "@/modules/profile/types";
import { Role } from "./role.enum";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  avatar_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  StudentProfile?: StudentProfile
  TeacherProfile?: TeacherProfile
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: User;
}