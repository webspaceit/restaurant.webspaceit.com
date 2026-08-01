import { Head, Link } from '@inertiajs/react';
import { CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Reservation = {
    id: number;
    guest_name: string;
    guest_email: string;
    guests: number;
    reservation_date: string;
    reservation_time: string;
    status: string;
    table: { number: number } | null;
    restaurant: { name: string };
};

type Props = { reservations: { data: Reservation[] } };

const statusColor: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
};

export default function Index({ reservations }: Props) {
    return (
        <>
            <Head title="Reservations" />
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Reservations</h1>
                <p className="text-muted-foreground mt-1">All incoming reservations</p>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Guest</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Guests</TableHead>
                            <TableHead>Table</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservations.data.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>
                                    <div className="font-medium">{r.guest_name}</div>
                                    <div className="text-xs text-muted-foreground">{r.guest_email}</div>
                                </TableCell>
                                <TableCell>{r.reservation_date}</TableCell>
                                <TableCell>{r.reservation_time}</TableCell>
                                <TableCell>{r.guests}</TableCell>
                                <TableCell>{r.table ? `Table ${r.table.number}` : '—'}</TableCell>
                                <TableCell>
                                    <Badge className={statusColor[r.status]} variant="outline">
                                        {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/owner/reservations/${r.id}`}>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {reservations.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                    <CalendarCheck className="mx-auto h-8 w-8 mb-2 opacity-50" />
                                    No reservations yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
