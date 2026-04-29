import { useQuery } from 'node_modules/@tanstack/react-query/build/legacy';
import { api } from '@/api/central.api';

export function usePriceVerifier(barcode) {
    const query = useQuery({
        queryKey: [`code: ${barcode}`],
        queryFn: async () => {
            return await api.get(`/price/${barcode}`);
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
