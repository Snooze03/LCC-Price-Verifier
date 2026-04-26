import { z } from 'zod';

const roles = z.enum(['admin', 'developer']);

export const createAccountSchema = z.object({
    email: z.email('Enter a valid email'),
    password: z.string().min(1),
    role: z.enum(roles),
});
