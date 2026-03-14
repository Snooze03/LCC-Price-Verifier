import { useQuery } from 'node_modules/@tanstack/react-query/build/legacy';
import { api } from '@/api/backend';

export function usePriceVerifier(barcode) {
    const price = useQuery({
        queryKey: [`code: ${barcode}`],
        queryFn: async () => {
            return await api.get(`/price/${barcode}`);
        },
        enabled: !!barcode && barcode !== 'null',
    });

    return {
        price: price.data?.data,
        isLoading: price.isFetching,
        isSuccess: price.isSuccess,
        isError: price.isError,
    };
}
