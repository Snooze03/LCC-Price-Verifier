import { Outlet } from 'react-router';
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
} from '../ui/sidebar';
import { LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { DashboardModal } from '@/modals/dashboardModal';

export function DashboardLayout() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <SidebarProvider>
                <Sidebar className="bg-[#1e2433] border-r border-[#2e3650]">
                    {/* Header */}
                    <SidebarHeader className="bg-[#1e2433] px-4 py-5 border-b border-[#2e3650]">
                        <h1 className="text-white font-bold text-base leading-tight">
                            Liberty Commercial Center
                        </h1>
                        <p className="text-[#6b7a9e] text-[10px] uppercase tracking-widest mt-0.5">
                            Admin Panel
                        </p>
                    </SidebarHeader>

                    {/* Main Nav */}
                    <SidebarContent className="bg-[#1e2433] px-1 py-3">
                        <SidebarGroup>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="w-full flex items-center m-1 gap-3 px-3 py-2 rounded-md bg-[#2e3a56] text-white text-sm font-medium">
                                        <LayoutDashboard
                                            size={20}
                                            className="shrink-0 text-[#99AADF]"
                                        />
                                        Branch Accounts
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton className="w-full flex items-center gap-3 m-1 px-3 py-2 rounded-md text-[#8a96b3] text-sm hover:bg-[#2e3a56] hover:text-white transition-colors">
                                        <Settings size={22} />
                                        Configurations
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>

                    {/* Footer */}
                    <SidebarFooter className="bg-[#1e2433] px-2 py-3 border-t border-[#2e3650]">
                        <SidebarMenu>
                            <SidebarMenuItem></SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[#8a96b3] text-sm hover:bg-[#2e3a56] hover:text-white transition-colors">
                                    <LogOut size={20} />
                                    Logout
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
