import { Role } from './role.enum'

export interface UserPayload {
  id: string
  email: string
  avatar?: string
  role: Role
}

export interface UserDetails {
  id: string
  full_name: string
  email: string
  avatar_url?: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CloudinaryPayload {
  imageUrl: string
  imagePublicId: string
}

export interface PaginationParams {
  limit?: number
  before?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  hasMore: boolean
  total: number
}