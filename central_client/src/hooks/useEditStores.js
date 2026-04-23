import { api } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { id } from 'zod/v4/locales';

export function UseEditStores({ onSuccess } = {}) {
    const queryClient = useQueryClient();

    const { mutate: editStore, isLoading } = useMutation({
        mutationFn: async ({ storeID, formData, store }) => {
            const payload = {
                id: Number(storeID),
                store_id: Number(formData.get('store_id')),
                location: String(formData.get('location')),
                password: String(formData.get('password')),
                config: [
                    {
                        id: store.config?.[0]?.id,
                        store_id: Number(formData.get('store_id')),
                        connection_type: String(
                            formData.get('connection_type'),
                        ),
                        db_user: String(formData.get('db_user')),
                        db_password: String(formData.get('db_password')),
                        host: String(formData.get('host')),
                        port: String(formData.get('port')),
                        db_name: String(formData.get('database')),
                        image_path: String(formData.get('imagepath')),
                    },
                ],
            };

            const response = await api.patch(`/stores`, payload);

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
            onSuccess?.();
        },
        onError: (error) => {
            console.log('full error:', error);
            console.log('error message:', error.message);
        },
    });

    return { editStore, isLoading };
}
