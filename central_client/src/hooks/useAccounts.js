import { api } from '@/api/api';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

export function useAccounts() {
    const queryClient = useQueryClient();

    const get = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await api.get('accounts');
            return response.data;
        },
    });

    const deleteAccount = useMutation({
        mutationKey: ['accounts-delete'],
        mutationFn: async (account_id) => {
            const response = await api.delete(`accounts/${account_id}`);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
    });

    const create = useMutation({
        mutationKey: ['accounts-create'],
        mutationFn: async (account) => {
            const response = await api.post('accounts', account);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['accounts'] });
        },
    });

    return {
        // Get Data/States
        accounts: get.data,
        isPending: get.isPending,
        isError: get.isError,
        error: get.error,

        // Delete
        deleteAccount: deleteAccount.mutateAsync,
        isDeleting: deleteAccount.isPending,
        isDeleteError: deleteAccount.isError,
        deleteError: deleteAccount.error,

        // Create
        createAccount: create.mutate,
        isCreating: create.isPending,
        isCreateError: create.isError,
        createError: create.error,
    };
}
