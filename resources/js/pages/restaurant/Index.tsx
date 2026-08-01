import { Head, Link } from '@inertiajs/react';
import { Search, Star, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Restaurant = {
    id: number;
    name: string;
    slug: string;
    cuisine: string;
    address: string;
    image: string | null;
    opening_hours: string | null;
};

type Props = {
    restaurants: Restaurant[];
};

export default function Index({ restaurants }: Props) {
    const [search, setSearch] = useState('');

    const filtered = restaurants.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <Head title="Restaurants" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Restaurants</h1>
                    <p className="mt-2 text-muted-foreground">
                        Browse restaurants and book your table
                    </p>
                </div>

                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search by name or cuisine..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((r) => (
                        <Card key={r.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                            <div className="aspect-video bg-muted">
                                {r.image && (
                                    <img src={r.image} alt={r.name} className="h-full w-full object-cover" />
                                )}
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-lg">{r.name}</h3>
                                    <Badge variant="secondary" className="shrink-0">{r.cuisine}</Badge>
                                </div>
                                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {r.address}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" />
                                        {r.opening_hours}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t p-4">
                                <Link href={`/restaurants/${r.id}`} className="w-full">
                                    <Button className="w-full" variant="outline">
                                        View Menu & Book
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <p className="col-span-full py-12 text-center text-muted-foreground">
                            No restaurants found.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
