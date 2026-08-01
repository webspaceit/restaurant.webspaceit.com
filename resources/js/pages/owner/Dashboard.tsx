import { Head, Link } from '@inertiajs/react';
import { TrendingUp, Users, CalendarCheck, DollarSign, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Analytics = {
    totalReservations: number;
    totalGuests: number;
    revenue: number;
    occupancyRate: number;
};

type RecentReservation = {
    id: number;
    restaurant: string;
    guest: string;
    date: string;
    time: string;
    guests: number;
    status: string;
};

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: string;
    total_reservations: number;
    last_visit: string;
};

type Props = {
    analytics: Analytics;
    recentReservations: RecentReservation[];
    customers: Customer[];
};

const statusColor: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
};

export default function Dashboard({ analytics, recentReservations, customers }: Props) {
    const stats = [
        {
            title: 'Total Reservations',
            value: analytics.totalReservations.toString(),
            icon: CalendarCheck,
            change: '+12%',
        },
        {
            title: 'Total Guests',
            value: analytics.totalGuests.toString(),
            icon: Users,
            change: '+8%',
        },
        {
            title: 'Revenue',
            value: `$${analytics.revenue.toLocaleString()}`,
            icon: DollarSign,
            change: '+15%',
        },
        {
            title: 'Occupancy Rate',
            value: `${analytics.occupancyRate}%`,
            icon: TrendingUp,
            change: '+5%',
        },
    ];

    return (
        <>
            <Head title="Owner Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Overview of your restaurant performance
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {stat.change} from last month
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Reservations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recentReservations.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No reservations yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentReservations.map((r) => (
                                        <Link key={r.id} href={`/owner/reservations/${r.id}`} className="block">
                                            <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors">
                                                <div>
                                                    <p className="text-sm font-medium">{r.guest}</p>
                                                    <p className="text-xs text-muted-foreground">{r.date} at {r.time} &middot; {r.guests} guests</p>
                                                </div>
                                                <Badge className={statusColor[r.status]} variant="outline">
                                                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Popular Time Slots</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Peak hours data will appear here as more reservations are made.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Customers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {customers.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No customers yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {customers.map((customer) => (
                                    <div key={customer.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{customer.name}</p>
                                            <div className="flex items-center gap-4 mt-1">
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Mail className="h-3 w-3" />
                                                    {customer.email}
                                                </span>
                                                {customer.phone && (
                                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Phone className="h-3 w-3" />
                                                        {customer.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{customer.total_reservations} reservations</p>
                                            <p className="text-xs text-muted-foreground">Last visit: {customer.last_visit}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
