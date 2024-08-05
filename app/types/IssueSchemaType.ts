import { z } from 'zod';

export const issueSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});