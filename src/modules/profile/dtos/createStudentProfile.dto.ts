import { z } from 'zod'

export const createStudentProfileDto = z.object({
  target_score: z.number().min(1, 'Target score must be greater than 0'),
  current_level: z.string().min(1, 'Current level is required'),
})

export type CreateStudentProfileDto = z.infer<typeof createStudentProfileDto>