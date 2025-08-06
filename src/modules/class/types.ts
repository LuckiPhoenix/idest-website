export interface ClassMember {
  id: string
  class_id: string
  student_id: string
  joined_at: string
  status: string // 'active', 'inactive', 'removed'
  student: {
    id: string
    full_name: string
    email: string
    avatar_url?: string
  }
}

export interface ClassTeacher {
  id: string
  class_id: string
  teacher_id: string
  role: string // 'teacher', 'assistant', 'co-teacher'
  teacher: {
    id: string
    full_name: string
    email: string
    avatar_url?: string
  }
}

export interface ClassResponse {
  id: string
  name: string
  description: string
  is_group: boolean
  invite_code: string
  schedule?: any
  created_by: string
  created_at: string
  updated_at: string
  creator: {
    id: string
    full_name: string
    email: string
    avatar_url?: string
  }
  members: ClassMember[]
  teachers: ClassTeacher[]
  _count: {
    members: number
    teachers: number
    sessions: number
  }
}

export interface ClassListItem {
  id: string
  name: string
  description: string
  is_group: boolean
  invite_code: string
  created_by: string
  created_at: string
  updated_at: string
  creator: {
    id: string
    full_name: string
  }
  _count: {
    members: number
    teachers: number
    sessions: number
  }
}

export interface UserClassesResponse {
  created: ClassListItem[] // Classes user created
  teaching: ClassListItem[] // Classes user teaches
  enrolled: ClassListItem[] // Classes user is student in
}

export interface ClassMembershipResponse {
  id: string
  class_id: string
  student_id: string
  joined_at: string
  status: string
  class: {
    id: string
    name: string
    description: string
    invite_code: string
  }
}

export interface ClassStatistics {
  total_members: number
  active_members: number
  total_sessions: number
  upcoming_sessions: number
  total_messages: number
  recent_activity: {
    new_members_this_week: number
    sessions_this_week: number
    messages_this_week: number
  }
}