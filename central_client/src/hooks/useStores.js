import { api } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export function useStores() {
    const query = useQuery({
        queryKey: ['stores'],
        queryFn: async () => {
            const response = await api.get('stores');
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
