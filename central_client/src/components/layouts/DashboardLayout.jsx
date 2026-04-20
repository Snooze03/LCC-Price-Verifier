import { Outlet } from 'react-router';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider,
} from '../ui/sidebar';

export function DashboardLayout() {
    return (
        <>
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader>
                        <div>HEAD</div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <div> CONTENT</div>
                            <div>STORES</div>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <div>LOGOUT</div>
                    </SidebarFooter>
                </Sidebar>
            </SidebarProvider>

            {/* <div className="w-screen h-screen"> */}
            <Outlet />
            {/* </div> */}
        </>
    );
}
