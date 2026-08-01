import { Head, Link } from '@inertiajs/react';
import { MapPin, Clock, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MenuItemCard } from '@/components/MenuItemCard';

type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
};

type Restaurant = {
    id: number;
    name: string;
    description: string;
    cuisine: string;
    rating?: number;
    address: string;
    phone: string;
    opening_hours: string;
    image?: string;
};

type Props = {
    restaurant: Restaurant;
    menuItems: MenuItem[];
};

export default function Show({ restaurant, menuItems }: Props) {
    return (
        <>
            <Head title={restaurant.name} />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                            {restaurant.image && (
                                <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
                            )}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {restaurant.address}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {restaurant.opening_hours}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {restaurant.phone}
                                </span>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                <span className="flex items-center gap-1 text-sm font-medium">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {restaurant.rating}
                                </span>
                                <Badge variant="secondary">{restaurant.cuisine}</Badge>
                            </div>
                            <p className="mt-4 text-muted-foreground">{restaurant.description}</p>
                        </div>

                        <Separator />

                        <div>
                            <h2 className="text-xl font-bold mb-4">Menu</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {menuItems.map((item) => (
                                    <MenuItemCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Make a Reservation</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Book your table at {restaurant.name}. Choose your preferred date, time, and party size.
                                </p>
                                <Link href={`/restaurants/${restaurant.id}/book`}>
                                    <Button className="w-full" size="lg">
                                        Book a Table
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
