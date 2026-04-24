import { api } from '@/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function UseEditAccount({ onSuccess } = {}) {
    const queryClient = useQueryClient();
    const { mutate: editAccount, isLoading } = useMutation({
        mutationFn: async ({ accountID, formData }) => {
            const payload = {
                id: Number(accountID), // ← was missing, needed to identify which account to update
                email: String(formData.get('email')),
                role: String(formData.get('role')),
                password: String(formData.get('password')),
            };
            const response = await api.patch('/account', payload);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });
            onSuccess?.();
        },
        onError: (error) => {
            console.log('full error:', error);
            console.log('error message:', error.message);
        },
    });
    return { editAccount, isLoading };
}
