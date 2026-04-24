import { api } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export function useStores() {
    const getStores = useQuery({
        queryKey: ['stores'],
        queryFn: async () => {
            const response = await api.get('stores');
            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 3,
    });

    return {
        stores: getStores.data,
        isPending: getStores.isPending,
        isError: getStores.isError,
        error: getStores.error,
    };
}
