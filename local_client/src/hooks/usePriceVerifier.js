import { useQuery } from '@tanstack/react-query';

import { localAPI } from '@/api/local.api';

export function usePriceVerifier(barcode) {
    const query = useQuery({
        queryKey: [`code: ${barcode}`],
        queryFn: async () => {
            const response = await localAPI.get(`/price/${barcode}`);
            return response.data;
        },
        enabled: !!barcode && barcode !== 'null',
        retry: false,
        staleTime: 60 * 1000,
    });

    return {
        product: query.data,
        isPending: query.isPending,
        isFetching: query.isFetching,
        isSuccess: query.isSuccess,
        isError: query.isError,
    };
}
