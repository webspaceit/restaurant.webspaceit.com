import { Link, router, usePage } from '@inertiajs/react';
import { BarChart3, Calendar, LayoutDashboard, Menu as MenuIcon, Store, UtensilsCrossed, Table2, ChevronLeft, ChevronRight, ClipboardList, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const navItems = [
    { title: 'Dashboard', href: '/owner/dashboard', icon: LayoutDashboard },
    { title: 'Reservations', href: '/owner/reservations', icon: ClipboardList },
    { title: 'Calendar', href: '/owner/calendar', icon: Calendar },
    { title: 'Restaurants', href: '/owner/restaurants', icon: Store },
    { title: 'Menus', href: '/owner/menus', icon: UtensilsCrossed },
    { title: 'Tables', href: '/owner/tables', icon: Table2 },
    { title: 'Analytics', href: '/owner/analytics', icon: BarChart3 },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props;
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <aside
                className={cn(
                    'flex flex-col border-r bg-background transition-all duration-300',
                    collapsed ? 'w-16' : 'w-64',
                )}
            >
                <div className="flex h-16 items-center justify-between px-4 border-b">
                    {!collapsed && (
                        <Link href="/owner/dashboard" className="font-bold text-lg">
                            Owner Panel
                        </Link>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className={cn(collapsed && 'mx-auto')}
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>

                <nav className="flex-1 p-2 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                                collapsed && 'justify-center px-2',
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {!collapsed && <span>{item.title}</span>}
                        </Link>
                    ))}
                </nav>

                <Separator />
                <div className="p-2 space-y-1">
                    {collapsed ? (
                        <div className="flex justify-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.post('/logout')}
                                title="Log out"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-3 py-2">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{auth.user?.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{auth.user?.email}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.post('/logout')}
                                title="Log out"
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                        <Link href="/owner/calendar">
                            <Button variant="ghost" size="sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                Calendar
                            </Button>
                        </Link>
                        <Link href="/owner/analytics">
                            <Button variant="ghost" size="sm">
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Analytics
                            </Button>
                        </Link>
                        <Link href="/owner/menus">
                            <Button variant="ghost" size="sm">
                                <UtensilsCrossed className="mr-2 h-4 w-4" />
                                Menus
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
