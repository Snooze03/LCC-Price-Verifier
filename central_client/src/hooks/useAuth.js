import { api, addToken } from '@/api/api';
import { useMutation } from '@tanstack/react-query';

export function useAuth() {
    const mutation = useMutation({
        mutationKey: ['access_token'],
        mutationFn: async ({ email, password }) => {
            const response = await api.post('auth/login', {
                email,
                password,
            });
            return response;
        },
        onSuccess: async (data) => {
            // console.log('Access Token: ', data.data.body.access_token);
            await addToken(data.data.body.access_token);
        },
    });

    return {
        login: mutation.mutate,
        isSuccess: mutation.isSuccess,
        isLoading: mutation.isPending,
        isError: mutation.isError,
    };
}
