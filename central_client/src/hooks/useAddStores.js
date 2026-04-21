// src/hooks/useAddStore.js
import { api } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddStore() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationKey: ['add_store'],
        mutationFn: async (storeData) => {
            // ✅ receives the whole object
            console.log('Store Data:', storeData); // 👈 add this
            const response = await api.post('stores', storeData);
            console.log('error', response.data);
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
