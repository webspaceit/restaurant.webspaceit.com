import { Head, Link } from '@inertiajs/react';
import { Store, CalendarCheck, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
    stats?: {
        totalRestaurants: number;
        upcomingReservations: number;
        totalReservations: number;
    };
};

export default function Dashboard({ stats }: Props) {
    const s = stats ?? { totalRestaurants: 0, upcomingReservations: 0, totalReservations: 0 };

    const cards = [
        { title: 'Restaurants', value: s.totalRestaurants, icon: Store, href: '/restaurants' },
        { title: 'Upcoming Reservations', value: s.upcomingReservations, icon: CalendarCheck, href: '/customer/reservations' },
        { title: 'Total Reservations', value: s.totalReservations, icon: TrendingUp, href: '/customer/reservations' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {cards.map((card) => (
                        <Card key={card.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                                <card.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{card.value}</div>
                                <Link href={card.href}>
                                    <Button variant="link" className="px-0 h-auto mt-2 text-sm">View details <ArrowRight className="ml-1 h-3 w-3" /></Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/restaurants"><Button>Browse Restaurants</Button></Link>
                            <Link href="/customer/reservations"><Button variant="outline">My Reservations</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = () => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ],
});
