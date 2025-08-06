import { z } from 'zod'

export const updateClassDto = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  is_group: z.boolean().optional(),
  schedule: z.any().optional(),
})

export type UpdateClassDto = z.infer<typeof updateClassDto>