import { z } from 'zod';

export const loginStoreSchema = {
    body: z.object({
        store_id: z.coerce.number().min(1).max(3),
        password: z.string().min(1),
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

export const createStoreSchema = {
    body: z.object({
        store_id: z.coerce.number().min(1).max(3),
        password: z.string().min(1),
        location: z.string().min(1),
        config: z.array({
            connection_type: z.string().min(1),
            db_user: z.string().min(1),
            db_password: z.string().min(1),
            host: z.string().min(1),
            port: z.string().min(1),
            db_name: z.string().min(1),
            image_path: z.string().min(1),
        }),
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
