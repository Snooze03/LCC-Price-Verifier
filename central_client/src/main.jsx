import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import '@/styles/index.css';
import { AppRoutes } from './routes';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 3,
        },
        mutations: {
            throwOnError: false,
            retry: 3,
        },
    },
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppRoutes />
            <Toaster />
        </QueryClientProvider>
    </StrictMode>,
);
