import { useState } from 'react';
import { useQuery } from 'node_modules/@tanstack/react-query/build/legacy';

import { api } from '@/api/backend';

export function usePriceVerifier(barcode) {
    const price = useQuery({
        queryKey: [barcode],
        queryFn: async () => {
            return await api.get('/price');
        },
    });

    return { price: price.data };
}
