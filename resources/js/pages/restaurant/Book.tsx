import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Clock, Users, ChevronLeft, LoaderCircle, Table2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from '@/components/date-picker';
import { cn } from '@/lib/utils';
import InputError from '@/components/input-error';

type Table = {
    id: number;
    number: number;
    capacity: number;
    location: string | null;
};

type Props = {
    restaurant: {
        id: number;
        name: string;
    };
    tables: Table[];
};

const timeSlots = [
    '11:30', '12:00', '12:30', '13:00', '13:30',
    '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

function toDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

export default function Book({ restaurant, tables }: Props) {
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(2);
    const [tableId, setTableId] = useState<number | null>(null);
    const [special, setSpecial] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const availableTables = tables.filter((t) => t.capacity >= guests);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!date || !time || submitting) return;

        setSubmitting(true);
        setErrors({});
        router.post('/reservations', {
            restaurant_id: restaurant.id,
            table_id: tableId,
            reservation_date: toDateString(date),
            reservation_time: time,
            guests,
            special_requests: special,
        }, {
            onError: (err) => setErrors(err),
            onFinish: () => setSubmitting(false),
        });
    }

    return (
        <>
            <Head title={`Book - ${restaurant.name}`} />

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
                <Link
                    href={`/restaurants/${restaurant.id}`}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back to {restaurant.name}
                </Link>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Reserve a Table</CardTitle>
                            <CardDescription>
                                Book your experience at {restaurant.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-base font-semibold">Date</Label>
                                <DatePicker
                                    value={date}
                                    onChange={(d) => d && setDate(d)}
                                    min={today}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Time</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    {timeSlots.map((slot) => (
                                        <Button
                                            key={slot}
                                            type="button"
                                            variant={time === slot ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setTime(slot)}
                                        >
                                            <Clock className="mr-1 h-3 w-3" />
                                            {slot}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="guests">Number of Guests</Label>
                                <div className="flex flex-wrap gap-2">
                                    {guestOptions.map((n) => (
                                        <Button
                                            key={n}
                                            type="button"
                                            variant={guests === n ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => { setGuests(n); setTableId(null); }}
                                        >
                                            <Users className="mr-1 h-3 w-3" />
                                            {n}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Select a Table</Label>
                                {availableTables.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No tables available for {guests} guests.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                        {availableTables.map((t) => (
                                            <Button
                                                key={t.id}
                                                type="button"
                                                variant={tableId === t.id ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setTableId(t.id)}
                                                className={cn(
                                                    'h-auto flex-col py-3 gap-1',
                                                    tableId === t.id && 'ring-2 ring-primary'
                                                )}
                                            >
                                                <Table2 className="h-4 w-4" />
                                                <span className="text-xs font-medium">Table {t.number}</span>
                                                <span className="text-[10px] opacity-70">
                                                    {t.capacity} {t.capacity === 1 ? 'seat' : 'seats'}
                                                    {t.location ? ` · ${t.location}` : ''}
                                                </span>
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="special">Special Requests (optional)</Label>
                                <Textarea
                                    id="special"
                                    placeholder="Allergies, celebrations, seating preferences..."
                                    className="min-h-[100px]"
                                    value={special}
                                    onChange={(e) => setSpecial(e.target.value)}
                                />
                            </div>

                            {Object.keys(errors).length > 0 && (
                                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                                    <div className="flex items-center gap-2 text-sm font-medium text-destructive mb-1">
                                        <AlertCircle className="h-4 w-4" />
                                        Please fix the following errors
                                    </div>
                                    {Object.entries(errors).map(([key, msg]) => (
                                        <p key={key} className="text-xs text-destructive/80 ml-6">{msg}</p>
                                    ))}
                                </div>
                            )}

                            <Button className="w-full" size="lg" type="submit" disabled={!date || !time || !tableId || submitting}>
                                {submitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                {submitting ? 'Reserving...' : 'Confirm Reservation'}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
}
