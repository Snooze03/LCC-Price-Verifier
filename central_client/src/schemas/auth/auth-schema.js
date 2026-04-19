import { z } from 'zod';

const authSchema = z.object({
    email: z.email('Enter a valid email'),
    password: z.string(),
});

export { authSchema };
