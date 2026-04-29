import { useQuery } from 'node_modules/@tanstack/react-query/build/legacy';
import { localAPI } from '@/api/local.api';

export function usePriceVerifier(barcode) {
    const query = useQuery({
        queryKey: [`code: ${barcode}`],
        queryFn: async () => {
            return await localAPI.get(`/price/${barcode}`);
        },
        enabled: !!barcode && barcode !== 'null',
        retry: false,
    });

    return {
        product: query.data?.data,
        isLoading: query.isPending,
        isSuccess: query.isSuccess,
        isError: query.isError,
    };
}
