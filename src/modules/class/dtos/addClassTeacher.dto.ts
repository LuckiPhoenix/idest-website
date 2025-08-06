import { z } from 'zod'

export const addClassTeacherDto = z.object({
  teacher_id: z.string().min(1, 'Teacher ID is required'),
  role: z.string().optional().default('teacher'),
})

export type AddClassTeacherDto = z.infer<typeof addClassTeacherDto>