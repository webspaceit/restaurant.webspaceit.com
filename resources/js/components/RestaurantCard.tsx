import { Link } from '@inertiajs/react';
import { MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Restaurant = {
    id: number;
    name: string;
    cuisine: string;
    address: string;
    image: string | null;
    opening_hours: string | null;
};

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <div className="aspect-video bg-muted">
                {restaurant.image && <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />}
            </div>
            <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                    <Badge variant="secondary" className="shrink-0">{restaurant.cuisine}</Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{restaurant.address}</span>
                    {restaurant.opening_hours && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{restaurant.opening_hours}</span>}
                </div>
            </CardContent>
            <CardFooter className="border-t p-4">
                <Link href={`/restaurants/${restaurant.id}`} className="w-full">
                    <Button className="w-full" variant="outline">View Menu & Book</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
