import { Head, Link } from '@inertiajs/react';
import { CalendarCheck, History, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReservationCard } from '@/components/ReservationCard';

type Reservation = {
    id: number;
    restaurant_name: string;
    date: string;
    time: string;
    guests: number;
    status: 'confirmed' | 'pending' | 'cancelled';
    table?: string;
};

type Props = {
    upcomingReservations: Reservation[];
    pastReservations: Reservation[];
};

export default function Dashboard({ upcomingReservations, pastReservations }: Props) {
    return (
        <>
            <Head title="My Reservations" />

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">My Reservations</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your restaurant bookings
                        </p>
                    </div>
                    <Link href="/restaurants">
                        <Button>
                            <CalendarCheck className="mr-2 h-4 w-4" />
                            New Reservation
                        </Button>
                    </Link>
                </div>

                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming">
                            <Clock className="mr-2 h-4 w-4" />
                            Upcoming
                        </TabsTrigger>
                        <TabsTrigger value="past">
                            <History className="mr-2 h-4 w-4" />
                            Past
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming" className="mt-4 space-y-4">
                        {upcomingReservations.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <CalendarCheck className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p className="font-medium">No upcoming reservations</p>
                                <p className="text-sm mt-1">Book a table at your favorite restaurant.</p>
                                <Link href="/restaurants">
                                    <Button className="mt-4" variant="outline">Browse Restaurants</Button>
                                </Link>
                            </div>
                        ) : (
                            upcomingReservations.map((r) => (
                                <ReservationCard key={r.id} reservation={r} />
                            ))
                        )}
                    </TabsContent>
                    <TabsContent value="past" className="mt-4 space-y-4">
                        {pastReservations.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">
                                <History className="mx-auto h-12 w-12 mb-4 opacity-50" />
                                <p>No past reservations yet.</p>
                            </div>
                        ) : (
                            pastReservations.map((r) => (
                                <ReservationCard key={r.id} reservation={r} />
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
