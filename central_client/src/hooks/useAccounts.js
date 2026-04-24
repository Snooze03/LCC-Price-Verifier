import { api } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export function useAccount() {
    const query = useQuery({
        queryKey: ['account'],
        queryFn: async () => {
            const response = await api.get('account');
            return response.data;
        },
    });

    return {
        data: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    };
}
