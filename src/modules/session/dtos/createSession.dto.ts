import { z } from 'zod'

export const createSessionDto = z.object({
  class_id: z.string().min(1, 'Class ID is required'),
  start_time: z.string().datetime('Invalid start time format'),
  end_time: z.string().datetime().optional(),
  is_recorded: z.boolean().optional().default(false),
  metadata: z.any().optional(),
})

export type CreateSessionDto = z.infer<typeof createSessionDto>