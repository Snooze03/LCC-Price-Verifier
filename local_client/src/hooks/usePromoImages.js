import { useQuery } from 'node_modules/@tanstack/react-query/build/legacy';

import { localAPI } from '@/api/local.api';

export function usePromoImages() {
    const getImageList = useQuery({
        queryKey: ['image-list'],
        queryFn: async () => {
            const response = await localAPI.get('images/list');
            return response.data;
        },
    });

    return {
        imageList: getImageList?.data?.images ?? [],
        isPending: getImageList.isPending,
        isError: getImageList.isError,
        error: getImageList.error,
    };
}
