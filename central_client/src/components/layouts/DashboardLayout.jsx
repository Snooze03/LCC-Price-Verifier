import { Outlet, useLocation, useNavigate } from 'react-router';
import { Store, User, LogOut } from 'lucide-react';
import clsx from 'clsx';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
} from '@ui/sidebar';

const menuItems = [
    {
        title: 'Stores',
        icon: Store,
        url: '/dashboard',
    },
    {
        title: 'Accounts',
        icon: User,
        url: '/dashboard/accounts',
    },
];

export function DashboardLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <SidebarProvider>
            <Sidebar>
                {/* Header */}
                <SidebarHeader className="px-4 py-5 space-y-0.5">
                    <h1 className="text-sidebar-primary-foreground font-bold text-base leading-tight">
                        Liberty Commercial Center
                    </h1>
                    <p className="text-sidebar-foreground text-xs uppercase">
                        Admin Panel
                    </p>
                </SidebarHeader>

                {/* Main Nav */}
                <SidebarContent className="px-1 py-3">
                    <SidebarGroup>
                        <SidebarMenu className="gap-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.url === location.pathname;

                                return (
                                    <SidebarMenuItem key={item.url}>
                                        <SidebarMenuButton
                                            onClick={() => navigate(item.url)}
                                            className={clsx(
                                                'px-3 py-2 flex items-center gap-3 text-sm text-sidebar-primary rounded-md hover:bg-sidebar-accent',
                                                {
                                                    'bg-sidebar-accent text-sidebar-primary-foreground':
                                                        isActive,
                                                },
                                            )}
                                        >
                                            <Icon size={20} />
                                            {item.title}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                {/* Footer */}
                <SidebarFooter className="px-2 py-3">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={handleLogout}
                                className="px-3 py-2 flex items-center gap-3 text-sidebar-primary"
                            >
                                <LogOut size={20} />
                                Logout
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>

            <SidebarInset>
                <div className="flex-1 flex-col w-auto h-screen px-6 py-4">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
