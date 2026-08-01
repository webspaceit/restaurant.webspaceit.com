import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Check, X, RotateCcw, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type Reservation = {
    id: number;
    guest_name: string;
    guest_email: string;
    guest_phone: string | null;
    guests: number;
    reservation_date: string;
    reservation_time: string;
    status: string;
    special_requests: string | null;
    created_at: string;
    table: { number: number } | null;
    restaurant: { name: string; id: number };
    user: { name: string; email: string; phone: string | null } | null;
};

type Props = { reservation: Reservation };

const statusBadge: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
};

export default function Show({ reservation: r }: Props) {
    const updateStatus = (status: string) => {
        router.put(`/owner/reservations/${r.id}`, { status });
    };

    const actions: { label: string; status: string; icon: React.ReactNode; variant?: 'default' | 'destructive' | 'outline'; className?: string }[] = [];

    if (r.status === 'pending') {
        actions.push({ label: 'Confirm', status: 'confirmed', icon: <Check className="h-4 w-4" />, className: 'bg-green-600 hover:bg-green-700' });
        actions.push({ label: 'Cancel', status: 'cancelled', icon: <X className="h-4 w-4" />, variant: 'destructive' });
    } else if (r.status === 'confirmed') {
        actions.push({ label: 'Mark Completed', status: 'completed', icon: <ClipboardCheck className="h-4 w-4" />, className: 'bg-blue-600 hover:bg-blue-700' });
        actions.push({ label: 'Cancel', status: 'cancelled', icon: <X className="h-4 w-4" />, variant: 'destructive' });
        actions.push({ label: 'Revert to Pending', status: 'pending', icon: <RotateCcw className="h-4 w-4" />, variant: 'outline' });
    } else if (r.status === 'completed') {
        actions.push({ label: 'Revert to Confirmed', status: 'confirmed', icon: <RotateCcw className="h-4 w-4" />, variant: 'outline' });
    } else if (r.status === 'cancelled') {
        actions.push({ label: 'Restore to Pending', status: 'pending', icon: <RotateCcw className="h-4 w-4" />, variant: 'outline' });
    }

    return (
        <>
            <Head title={`Reservation #${r.id}`} />
            <div className="mb-6">
                <Link href="/owner/reservations" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to reservations
                </Link>
                <h1 className="text-2xl font-bold">Reservation #{r.id}</h1>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle>Guest Information</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div><span className="text-sm text-muted-foreground">Name</span><p className="font-medium">{r.guest_name}</p></div>
                        <div><span className="text-sm text-muted-foreground">Email</span><p className="font-medium">{r.guest_email}</p></div>
                        {(r.guest_phone || r.user?.phone) && (
                            <div>
                                <span className="text-sm text-muted-foreground">Phone</span>
                                <p className="font-medium">{r.guest_phone || r.user?.phone}</p>
                            </div>
                        )}
                        {r.user && <div><span className="text-sm text-muted-foreground">Account</span><p className="font-medium">{r.user.name}</p></div>}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Reservation Details</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Restaurant</span>
                            <span className="font-medium">{r.restaurant.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Date</span>
                            <span className="font-medium">{r.reservation_date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Time</span>
                            <span className="font-medium">{r.reservation_time}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Guests</span>
                            <span className="font-medium">{r.guests}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Table</span>
                            <span className="font-medium">{r.table ? `Table ${r.table.number}` : 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <Badge className={statusBadge[r.status]}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</Badge>
                        </div>
                        <Separator />
                        <div>
                            <span className="text-sm text-muted-foreground">Special Requests</span>
                            <p className="text-sm mt-1">{r.special_requests || 'None'}</p>
                        </div>
                    </CardContent>
                </Card>

                {actions.length > 0 && (
                    <Card className="lg:col-span-2">
                        <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
                        <CardContent className="flex gap-3 flex-wrap">
                            {actions.map((a) => (
                                <Button
                                    key={a.status}
                                    onClick={() => updateStatus(a.status)}
                                    variant={a.variant ?? 'default'}
                                    className={a.className}
                                >
                                    {a.icon}
                                    <span className="ml-2">{a.label}</span>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}
