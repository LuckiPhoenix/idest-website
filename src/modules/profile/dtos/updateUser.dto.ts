import { z } from 'zod'
import { Role } from '@/shared/types/role.enum'

export const updateUserDto = z.object({
  fullName: z.string().nullable(),
  role: z.nativeEnum(Role).default(Role.STUDENT),
  avatar: z.string().nullable(),
  isActive: z.boolean().default(true),
})

export type UpdateUserDto = z.infer<typeof updateUserDto>