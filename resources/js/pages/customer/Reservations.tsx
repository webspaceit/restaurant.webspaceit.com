import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { CalendarCheck, History, Clock, Users, ChevronRight, Utensils, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type Reservation = {
    id: number;
    restaurant: { id: number; name: string };
    reservation_date: string;
    reservation_time: string;
    guests: number;
    status: string;
    table: { number: number } | null;
};

type Props = { reservations: Reservation[] };

const statusConfig: Record<string, { label: string; classes: string; icon: typeof AlertCircle }> = {
    confirmed: { label: 'Confirmed', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800', icon: CalendarCheck },
    pending: { label: 'Pending', classes: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800', icon: Clock },
    cancelled: { label: 'Cancelled', classes: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800', icon: AlertCircle },
    completed: { label: 'Completed', classes: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800', icon: History },
};

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function isUpcoming(dateStr: string, status: string): boolean {
    if (status === 'cancelled' || status === 'completed') return false;
    return new Date(dateStr) >= new Date(new Date().toDateString());
}

export default function Reservations({ reservations }: Props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<{ id: number; name: string } | null>(null);
    const upcoming = reservations.filter((r) => isUpcoming(r.reservation_date, r.status));
    const past = reservations.filter((r) => !isUpcoming(r.reservation_date, r.status));
    const hasAny = reservations.length > 0;

    return (
        <>
            <Head title="My Reservations" />

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">My Reservations</h1>
                            <p className="text-muted-foreground mt-1 text-sm">
                                {hasAny ? `You have ${upcoming.length} upcoming reservation${upcoming.length !== 1 ? 's' : ''}` : 'Manage your dining plans'}
                            </p>
                        </div>
                        <Link href="/restaurants">
                            <Button className="gap-2 shrink-0">
                                <CalendarCheck className="h-4 w-4" />
                                New Reservation
                            </Button>
                        </Link>
                    </div>

                    {!hasAny ? (
                        <Card className="border-dashed border-2">
                            <CardContent className="flex flex-col items-center py-16">
                                <div className="rounded-full bg-muted p-4 mb-4">
                                    <Utensils className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h2 className="text-xl font-semibold mb-1">No reservations yet</h2>
                                <p className="text-muted-foreground text-sm mb-6 text-center max-w-sm">
                                    Looks like you haven't booked a table yet. Explore restaurants and make your first reservation.
                                </p>
                                <Link href="/restaurants">
                                    <Button variant="default" className="gap-2">
                                        <Utensils className="h-4 w-4" />
                                        Browse Restaurants
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-10">
                            {upcoming.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <h2 className="text-lg font-semibold">Upcoming</h2>
                                        <span className="text-sm text-muted-foreground tabular-nums">({upcoming.length})</span>
                                    </div>
                                    <div className="space-y-3">
                                        {upcoming.map((r) => {
                                            const cfg = statusConfig[r.status] || statusConfig.pending;
                                            const StatusIcon = cfg.icon;
                                            return (
                                                <button
                                                    key={r.id}
                                                    type="button"
                                                    onClick={() => { setSelectedRestaurant(r.restaurant); setDialogOpen(true); }}
                                                    className="block w-full text-left group"
                                                >
                                                    <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/30 active:scale-[0.99]">
                                                        <CardContent className="p-0">
                                                            <div className="flex items-center gap-4 p-4">
                                                                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                                                                    <Utensils className="h-5 w-5" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <h3 className="font-semibold truncate">{r.restaurant.name}</h3>
                                                                        <Badge className={`${cfg.classes} border text-[11px] px-2 py-0.5 font-medium`} variant="outline">
                                                                            <StatusIcon className="h-3 w-3 mr-1 inline" />
                                                                            {cfg.label}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                                                        <span className="inline-flex items-center gap-1.5">
                                                                            <CalendarCheck className="h-3.5 w-3.5 shrink-0" />
                                                                            {formatDate(r.reservation_date)}
                                                                        </span>
                                                                        <span className="inline-flex items-center gap-1.5">
                                                                            <Clock className="h-3.5 w-3.5 shrink-0" />
                                                                            {r.reservation_time}
                                                                        </span>
                                                                        <span className="inline-flex items-center gap-1.5">
                                                                            <Users className="h-3.5 w-3.5 shrink-0" />
                                                                            {r.guests} {r.guests === 1 ? 'guest' : 'guests'}
                                                                        </span>
                                                                    </div>
                                                                    {r.table && (
                                                                        <p className="text-xs text-muted-foreground mt-1">Table {r.table.number}</p>
                                                                    )}
                                                                </div>
                                                                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {past.length > 0 && (
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <History className="h-4 w-4 text-muted-foreground" />
                                        <h2 className="text-lg font-semibold">Past</h2>
                                        <span className="text-sm text-muted-foreground tabular-nums">({past.length})</span>
                                    </div>
                                    <div className="space-y-3">
                                        {past.map((r) => {
                                            const cfg = statusConfig[r.status] || statusConfig.pending;
                                            const StatusIcon = cfg.icon;
                                            return (
                                                <Link key={r.id} href={`/restaurants/${r.restaurant.id}`} className="block group">
                                                    <Card className="transition-all duration-200 hover:shadow-md opacity-75 hover:opacity-100">
                                                        <CardContent className="p-0">
                                                            <div className="flex items-center gap-4 p-4">
                                                                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                                                    <Utensils className="h-5 w-5" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <h3 className="font-semibold truncate">{r.restaurant.name}</h3>
                                                                        <Badge className={`${cfg.classes} border text-[11px] px-2 py-0.5 font-medium`} variant="outline">
                                                                            <StatusIcon className="h-3 w-3 mr-1 inline" />
                                                                            {cfg.label}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                                                                        <span className="inline-flex items-center gap-1.5">
                                                                            <CalendarCheck className="h-3.5 w-3.5 shrink-0" />
                                                                            {formatDate(r.reservation_date)}
                                                                        </span>
                                                                        <span className="inline-flex items-center gap-1.5">
                                                                            <Clock className="h-3.5 w-3.5 shrink-0" />
                                                                            {r.reservation_time}
                                                                        </span>
                                                                        <span className="inline-flex items-center gap-1.5">
                                                                            <Users className="h-3.5 w-3.5 shrink-0" />
                                                                            {r.guests} {r.guests === 1 ? 'guest' : 'guests'}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Want to book another?</DialogTitle>
                        <DialogDescription>
                            {selectedRestaurant
                                ? `You already have a reservation at ${selectedRestaurant.name}. Would you like to book another table?`
                                : 'Would you like to book another table?'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Stay here
                        </Button>
                        <Link href="/restaurants" onClick={() => setDialogOpen(false)}>
                            <Button>Browse Restaurants</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
