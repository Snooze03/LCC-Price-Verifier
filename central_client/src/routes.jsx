import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthLayout } from '@layouts/AuthLayout';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AuthRoot } from '@pages/auth/auth-root';
import { NotFound } from '@pages/miscs/NotFound';
import { StoresTab } from '@pages/dashboard/Stores';
import { AccountsTab } from '@pages/dashboard/Accounts';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route index element={<AuthRoot />} />
                </Route>

                {/* Private Routes */}
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route index element={<StoresTab />} />
                    <Route path="accounts" element={<AccountsTab />} />
                </Route>

                {/* Miscs */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export { AppRoutes };
