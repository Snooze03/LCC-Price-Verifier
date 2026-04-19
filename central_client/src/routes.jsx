import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthLayout } from '@layouts/AuthLayout';

import { AuthRoot } from './pages/auth/auth-root';
import { NotFound } from '@pages/miscs/NotFound';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route index element={<AuthRoot />} />
                </Route>

                {/* Private Routes */}

                {/* Miscs */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export { AppRoutes };
