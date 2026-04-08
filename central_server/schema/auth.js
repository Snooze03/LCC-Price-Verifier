import { z } from 'zod';

export const authSchema = {
    body: z.object({
        store_id: z.number(),
        password: z.string().min(10).max(20),
    }),
    response: {
        200: z.object({
            message: z.string(),
            body: z.object({
                result: z.array(z.any()),
            }),
        }),
        404: z.object({
            message: z.string(),
        }),
        401: z.object({
            message: z.string(),
        }),
    },
};
