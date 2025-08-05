import { z } from 'zod'
import { Role } from '@/shared/types/role.enum'

export const createUserDto = z.object({
  fullName: z.string(),
  role: z.nativeEnum(Role).default(Role.Student),
  avatar: z.string().nullable(),
})

export type CreateUserDto = z.infer<typeof createUserDto>