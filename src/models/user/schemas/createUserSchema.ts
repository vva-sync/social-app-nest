import z from 'zod';

export const createUserSchema = z.object({
  email: z.email('Invalid email address'),
  username: z.number().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
});
