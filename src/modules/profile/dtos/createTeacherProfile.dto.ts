import { Specialization } from '@/shared/types/specialization.enum'
import { z } from 'zod'

export const createTeacherProfileDto = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  avatar: z.string().nullable(),
  degree: z.string().min(1, 'Degree is required'),
  specialization: z.array(z.nativeEnum(Specialization)).min(1, 'Specialization is required'),
  bio: z.string().min(1, 'Bio is required'),
})

export type CreateTeacherProfileDto = z.infer<typeof createTeacherProfileDto>