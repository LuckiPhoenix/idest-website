import { z } from 'zod'

export const createClassDto = z.object({
  name: z.string().min(1, 'Class name is required'),
  description: z.string().min(1, 'Class description is required'),
  is_group: z.boolean(),
  schedule: z.any().optional(), // JSON schedule configuration
  invite_code: z.string().optional(), // Custom invite code (optional)
})

export type CreateClassDto = z.infer<typeof createClassDto>