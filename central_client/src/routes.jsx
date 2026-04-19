import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '@/pages/auth/LoginPage';
import StorePage from '@/components/storeAdminPage';
import BranchAccounts from '@/pages/branchAccounts.jsx';
import Configuration from '@/pages/configuration.jsx';
import { AuthLayout } from './components/layouts/AuthLayout';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route index element={<LoginPage />} />
                </Route>

                {/* Private Routes */}
                <Route path="/dashboard" element={<StorePage />}>
                    <Route
                        path="branch-accounts"
                        element={<BranchAccounts />}
                    />
                    <Route path="configuration" element={<Configuration />} />
                </Route>

                {/* Miscs */}
            </Routes>
        </BrowserRouter>
    );
}

export { AppRoutes };
