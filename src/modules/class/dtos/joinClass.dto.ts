import { z } from 'zod'

export const joinClassDto = z.object({
  invite_code: z.string().min(1, 'Invite code is required'),
})

export type JoinClassDto = z.infer<typeof joinClassDto>