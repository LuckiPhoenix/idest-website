import { z } from 'zod'

export const createTeacherProfileDto = z.object({
  degree: z.string().min(1, 'Degree is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  bio: z.string().min(1, 'Bio is required'),
})

export type CreateTeacherProfileDto = z.infer<typeof createTeacherProfileDto>