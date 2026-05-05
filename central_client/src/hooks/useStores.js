import { api } from '@/api/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

export function useStores() {
    const queryClient = useQueryClient();

    const get = useQuery({
        queryKey: ['stores'],
        queryFn: async () => {
            const response = await api.get('stores');
            return response.data;
        },
    });

    const stores = [{ location: 'Test Store', endpoint: 'http://test.com' }];
    const isPending = false;
    const isError = false;
    const error = null;
    const deleteRequest = useMutation({
        mutationKey: ['store-delete'],
        mutationFn: async (store_id) => {
            const response = await api.delete(`stores/${store_id}`);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['stores'] });
        },
    });

    const create = useMutation({
        mutationKey: ['store-create'],
        mutationFn: async (formData) => {
            const response = await api.post('stores', formData);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['stores'] });
        },
        onError: (error) => {
            return error;
        },
    });

    const update = useMutation({
        mutationKey: ['store-update'],
        mutationFn: async (formData) => {
            const response = await api.patch('stores', formData);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['stores'] });
        },
        onError: (error) => {
            return error;
        },
    });

    return {
        // Get data and states
        stores: get.data,
        isPending: get.isPending,
        isError: get.isError,
        error: get.error,

        // Delete data and states
        deleteStore: deleteRequest.mutate,
        isDeleting: deleteRequest.isPending,
        isDeleteError: deleteRequest.isError,
        deleteError: deleteRequest.error,

        // Create
        createStore: create.mutate,
        isCreating: create.isPending,
        isCreateError: create.isError,
        createError: create.error,

        // Update
        updateStore: update.mutate,
        isUpdating: update.isPending,
        isUpdateError: update.isError,
        updateError: update.error,
    };
}
