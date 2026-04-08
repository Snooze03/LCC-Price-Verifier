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
                store_id: z.number(),
            }),
        }),
        404: z.object({
            message: z.string(),
            store_id: z.number(),
        }),
    },
};
