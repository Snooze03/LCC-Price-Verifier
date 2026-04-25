import { z } from 'zod';

export const createStoreSchema = z.object({
    store_id: z.coerce.number('Enter a valid number').min(100).max(200),
    password: z.string().min(1),
    location: z.string().min(1),
    connection_type: z.string().min(1),
    db_user: z.string().min(1),
    db_password: z.string().min(1),
    host: z.string().min(1),
    port: z.string().min(1),
    db_name: z.string().min(1),
    image_path: z.string().min(1),
});
