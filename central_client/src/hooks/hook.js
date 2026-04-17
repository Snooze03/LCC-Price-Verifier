import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/api';

const queryClient = useQueryClient();

// GET
const { data, isLoading, error } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
        const response = await api.get('/stores');
        return response.data; // ← always return this
    },
});

// POST
const { mutate } = useMutation({
    mutationFn: async (payload) => {
        const response = await api.post('/stores', payload);
        return response.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
});
