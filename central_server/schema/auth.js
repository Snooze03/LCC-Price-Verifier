import { z } from 'zod';

export const authSchema = {
    body: z.object({
        store_id: z.number(),
        password: z.string(),
    }),
    response: {
        200: z.object({
            message: z.string(),
            body: z.object({
                access_token: z.string(),
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
