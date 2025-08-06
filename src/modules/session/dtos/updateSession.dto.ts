import { z } from 'zod'

export const updateSessionDto = z.object({
  start_time: z.string().datetime().optional(),
  end_time: z.string().datetime().optional(),
  is_recorded: z.boolean().optional(),
  recording_url: z.string().url().optional(),
  whiteboard_data: z.any().optional(),
  metadata: z.any().optional(),
})

export type UpdateSessionDto = z.infer<typeof updateSessionDto>