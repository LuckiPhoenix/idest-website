import { z } from 'zod'

export const addClassMemberDto = z.object({
  student_id: z.string().min(1, 'Student ID is required'),
  status: z.string().optional().default('active'),
})

export type AddClassMemberDto = z.infer<typeof addClassMemberDto>