import { useQuery } from '@tanstack/react-query';

import { centralAPI } from '@/api/central.api';

export function useStores() {
    const get = useQuery({
        queryKey: ['stores'],
        queryFn: async () => {
            const response = await centralAPI.get('pricever/stores');
            return response.data;
        },
        retry: false,
    });

    return {
        stores: get.data,
        refetch: get.refetch,
        isPending: get.isPending,
        isSuccess: get.isSuccess,
        isError: get.isError,
        error: get.error,
    };
}
