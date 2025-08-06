export interface SessionResponse {
  id: string
  class_id: string
  host_id: string
  start_time: string
  end_time?: string
  is_recorded: boolean
  recording_url?: string
  whiteboard_data?: any
  metadata?: any
  created_at: string
  class: {
    id: string
    name: string
    description: string
  }
  host: {
    id: string
    full_name: string
    email: string
    avatar_url?: string
  }
}

export interface UpcomingSessionResponse {
  id: string
  start_time: string
  end_time?: string
  is_recorded: boolean
  class: {
    id: string
    name: string
  }
  host: {
    id: string
    full_name: string
  }
}

export interface SessionParticipant {
  userId: string
  userFullName: string
  userAvatar?: string
  role: string
  socketId: string
  isOnline: boolean
}