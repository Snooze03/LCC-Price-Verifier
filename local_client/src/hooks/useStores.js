import { useQuery } from 'node_modules/@tanstack/react-query/build/legacy';
import { api } from '@/api/api';

export function useStores() {
    const get = useQuery({
        queryKey: ['stores'],
        queryFn: async () => {
            const response = await api.get('pricever/stores');
            return response.data;
        },
    });

    return {
        stores: get.data,
        isPending: get.isPending,
        isError: get.isError,
        error: get.error,
    };
}
