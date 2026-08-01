import { Head, Link } from '@inertiajs/react';
import { Palette, Store, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { edit as editBranding } from '@/routes/branding';

type Props = {
    stats: {
        totalRestaurants: number;
        totalUsers: number;
        totalReservations: number;
    };
};

export default function Dashboard({ stats }: Props) {
    const cards = [
        { title: 'Total Restaurants', value: stats.totalRestaurants, icon: Store, href: '/admin/restaurants' },
        { title: 'Total Users', value: stats.totalUsers, icon: Users, href: '/admin/users' },
        { title: 'Total Reservations', value: stats.totalReservations, icon: TrendingUp, href: '#' },
    ];

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">Platform overview</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 mb-8">
                {cards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{card.value}</p>
                            <Link href={card.href}><Button variant="link" className="px-0 h-auto mt-2 text-sm">View details</Button></Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Quick Actions</CardTitle>
                        <p className="mt-1 text-sm text-muted-foreground">Manage your app's look and feel</p>
                    </div>
                    <Palette className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <Link href={editBranding()}>
                        <Button>Branding settings</Button>
                    </Link>
                </CardContent>
            </Card>
        </>
    );
}
