import { Outlet } from 'react-router';
export function AuthLayout() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Outlet />
        </div>
    );
}
