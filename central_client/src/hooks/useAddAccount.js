import { api } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddAccount() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['add_account'],
        mutationFn: async (formData) => {
            const payload = {
                email: String(formData.get('email')),
                role: String(formData.get('role')),
                password: String(formData.get('password')),
            };
            const response = await api.post('account', payload);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });
        },
    });
    return {
        addAccount: mutation.mutate, // ← was addStore, must match what AccountDialog expects
        isSuccess: mutation.isSuccess,
        isLoading: mutation.isPending,
        isError: mutation.isError,
    };
}
