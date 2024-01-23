import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid Email Address'),
  password: z.string({ required_error: 'Password is required' }),
});

export const registerSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(3),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid Email Address'),
  password: z.string({ required_error: 'Password is required' }).min(6),
});

export const messageSchema = z.object({
  to: z.string({ required_error: 'To is required' }),
  sender: z.string({ required_error: 'Sender is required' }),
  subject: z.string({ required_error: 'Subject is required' }),
  body: z.string({ required_error: 'Body is required' }),
});
