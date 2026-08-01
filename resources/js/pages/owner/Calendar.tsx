import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Reservation = {
    id: number;
    time: string;
    guests: number;
    name: string;
    table: string;
};

type Props = {
    reservations: Reservation[];
};

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ reservations }: Props) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState<number | null>(today.getDate());

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

    const dayReservations = reservations.filter((r) => r.time.startsWith(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`));

    return (
        <>
            <Head title="Calendar" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Calendar</h1>
                    <p className="text-muted-foreground mt-1">
                        View and manage daily reservations
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Button variant="ghost" size="icon" onClick={prevMonth}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <CardTitle className="text-base">
                                    {monthName} {currentYear}
                                </CardTitle>
                                <Button variant="ghost" size="icon" onClick={nextMonth}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {weekDays.map((day) => (
                                    <div key={day} className="py-1 text-xs font-medium text-muted-foreground">
                                        {day}
                                    </div>
                                ))}
                                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                                    <div key={`empty-${i}`} />
                                ))}
                                {Array.from({ length: daysInMonth }).map((_, i) => {
                                    const day = i + 1;
                                    const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                                    const isSelected = day === selectedDate;
                                    return (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDate(day)}
                                            className={cn(
                                                'rounded-full py-1 text-sm hover:bg-accent transition-colors',
                                                isToday && 'font-bold text-primary',
                                                isSelected && 'bg-primary text-primary-foreground hover:bg-primary',
                                            )}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Reservations for {monthName} {selectedDate}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {dayReservations.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-8">
                                    No reservations for this day.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {dayReservations.map((r) => (
                                        <div
                                            key={r.id}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="text-sm font-medium">{r.time}</div>
                                                <Badge variant="secondary">Table {r.table}</Badge>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium">{r.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {r.guests} {r.guests === 1 ? 'guest' : 'guests'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
