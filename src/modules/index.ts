// Core HTTP Client
export { http } from './http'
export type { ResponseDto } from './response.dto'

// User/Profile Module
export * from './profile'

// Session Module
export * from './session'

// Meet Module (WebSocket & Real-time)
export * from './meet'

// Conversation Module (Private Messaging)
export * from './conversation'

// Class Module (Virtual Classrooms)
export * from './class'

// Shared Types
export * from '../shared/types/role.enum'
export * from '../shared/types/common.types'
export * from '../shared/types/message.types'
export * from '../shared/types/webrtc.types'
export * from '../shared/types/user.types'

// Supabase Integration
export { createClient } from './supabase/client'
export { createServerClient } from './supabase/server'