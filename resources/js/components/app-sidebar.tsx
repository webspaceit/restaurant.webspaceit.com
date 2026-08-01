import { Link, usePage } from '@inertiajs/react';
import {
    CalendarCheck,
    LayoutGrid,
    Settings,
    Shield,
    Store,
    Users,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const user = page.props.auth?.user;
    const roles =
        user && 'roles' in user ? (user.roles as { name: string }[]) : [];
    const isAdmin =
        Array.isArray(roles) && roles.some((r) => r.name === 'admin');

    const isOwner =
        Array.isArray(roles) && roles.some((r) => r.name === 'owner');

    const dashboardHref = isAdmin
        ? '/admin/dashboard'
        : isOwner
          ? '/owner/dashboard'
          : '/dashboard';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardHref,
            icon: LayoutGrid,
        },
        {
            title: 'Restaurants',
            href: '/restaurants',
            icon: Store,
        },
        ...(user
            ? [
                  {
                      title: 'My Reservations',
                      href: '/customer/reservations',
                      icon: CalendarCheck,
                  } as NavItem,
              ]
            : []),
        ...(isOwner || isAdmin
            ? [
                  {
                      title: 'Owner Panel',
                      href: '/owner/dashboard',
                      icon: Store,
                  } as NavItem,
              ]
            : []),
        ...(isAdmin
            ? [
                  {
                      title: 'Manage Restaurants',
                      href: '/admin/restaurants',
                      icon: Shield,
                  } as NavItem,
                  {
                      title: 'Manage Users',
                      href: '/admin/users',
                      icon: Users,
                  } as NavItem,
              ]
            : []),
        {
            title: 'Settings',
            href: '/settings/profile',
            icon: Settings,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
