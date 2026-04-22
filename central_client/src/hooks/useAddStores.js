import { api } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddStore() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['add_store'],
        mutationFn: async (formData) => {
            // ✅ receives raw formData
            const payload = {
                store_id: Number(formData.get('store_id')),
                location: String(formData.get('location')),
                password: String(formData.get('password')),
                connection_type: String(formData.get('connection_type')),
                db_user: String(formData.get('db_user')),
                db_password: String(formData.get('db_password')),
                host: String(formData.get('host')),
                port: String(formData.get('port')),
                db_name: String(formData.get('database')),
                image_path: String(formData.get('imagepath')),
            };
            console.log('Store Data:', payload);
            const response = await api.post('stores', payload);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stores'] });
        },
    });

    return {
        addStore: mutation.mutate,
        isSuccess: mutation.isSuccess,
        isLoading: mutation.isPending,
        isError: mutation.isError,
    };
}
