import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
    reservation: Reservation;
};

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive'> = {
    confirmed: 'default',
    pending: 'secondary',
    cancelled: 'destructive',
};

export function ReservationCard({ reservation }: Props) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle>{reservation.restaurant_name}</CardTitle>
                        {reservation.table && (
                            <p className="text-sm text-muted-foreground mt-1">Table: {reservation.table}</p>
                        )}
                    </div>
                    <Badge variant={statusVariants[reservation.status]}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {reservation.date}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {reservation.time}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {reservation.guests} {reservation.guests === 1 ? 'guest' : 'guests'}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                {reservation.status === 'confirmed' && (
                    <Button variant="outline" size="sm">Modify</Button>
                )}
                {reservation.status !== 'cancelled' && (
                    <Button variant="destructive" size="sm">Cancel</Button>
                )}
            </CardFooter>
        </Card>
    );
}
