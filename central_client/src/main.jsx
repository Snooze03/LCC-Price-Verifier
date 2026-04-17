import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import '@/styles/index.css';
import LoginPage from '@/components/loginPage';
import StorePage from '@/components/storeAdminPage';
import BranchAccounts from '@/pages/branchAccounts.jsx';
import Configuration from '@/pages/configuration.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<StorePage />}>
                        <Route
                            index
                            element={
                                <p className="flex justify-center">
                                    THIS IS THE MAIN CENTER
                                </p>
                            }
                        />
                        <Route
                            path="branch-accounts"
                            element={<BranchAccounts />}
                        />
                        <Route
                            path="configuration"
                            element={<Configuration />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
);
