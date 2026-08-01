import { Head } from '@inertiajs/react';
import { TrendingUp, Users, DollarSign, CalendarCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsChart } from '@/components/AnalyticsChart';

type Analytics = {
    totalReservations: number;
    totalGuests: number;
    revenue: number;
    occupancyRate: number;
};

type Props = {
    analytics: Analytics;
    monthlyData?: { label: string; value: number }[];
};

export default function Analytics({ analytics, monthlyData = [] }: Props) {
    const cards = [
        { title: 'Total Reservations', value: analytics.totalReservations, icon: CalendarCheck },
        { title: 'Total Guests', value: analytics.totalGuests, icon: Users },
        { title: 'Revenue', value: `$${Number(analytics.revenue).toFixed(2)}`, icon: DollarSign },
        { title: 'Occupancy Rate', value: `${analytics.occupancyRate}%`, icon: TrendingUp },
    ];

    return (
        <>
            <Head title="Analytics" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="text-muted-foreground mt-1">
                    Performance overview for your restaurant
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {card.title}
                            </CardTitle>
                            <card.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{card.value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-6">
                <AnalyticsChart
                    title="Monthly Reservations"
                    data={monthlyData}
                    emptyMessage="No reservation data yet."
                />
            </div>
        </>
    );
}
