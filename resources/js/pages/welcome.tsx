import { Head, Link, router } from '@inertiajs/react';
import { Search, Star, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { home, login, register } from '@/routes';

type Props = {
    restaurants: Array<{
        id: number;
        name: string;
        slug: string;
        cuisine: string;
        address: string;
        image: string | null;
        opening_hours: string | null;
    }>;
};

export default function Welcome({ restaurants }: Props) {
    const [search, setSearch] = useState('');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        router.get('/restaurants', { search });
    }

    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen bg-background">
                <header className="border-b">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <Link href={home().url} className="text-xl font-bold">RestaurantApp</Link>
                        <nav className="flex items-center gap-4">
                            <Link href={login().url}>
                                <Button variant="ghost">Log in</Button>
                            </Link>
                            <Link href={register().url}>
                                <Button>Sign up</Button>
                            </Link>
                        </nav>
                    </div>
                </header>

                <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                                Discover Great Food
                            </h1>
                            <p className="mt-6 text-lg text-muted-foreground">
                                Find and book the best restaurants in your area. Reserve a table, explore menus, and enjoy an unforgettable dining experience.
                            </p>
                            <form onSubmit={handleSearch} className="mt-10 flex items-center gap-2 rounded-full border bg-background p-1 shadow-sm">
                                <div className="flex flex-1 items-center gap-2 pl-4">
                                    <Search className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search restaurants or cuisines..."
                                        className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                                    />
                                </div>
                                <Button type="submit" className="rounded-full">Search</Button>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold">Featured Restaurants</h2>
                            <p className="mt-2 text-muted-foreground">Popular dining spots in your area</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {restaurants.map((r) => (
                                <RestaurantCard
                                    key={r.id}
                                    id={r.id}
                                    name={r.name}
                                    cuisine={r.cuisine}
                                    rating={null}
                                    image={r.image}
                                    address={r.address}
                                    hours={r.opening_hours ?? ''}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <footer className="border-t py-8">
                    <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
                        &copy; {new Date().getFullYear()} RestaurantApp. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    );
}

function RestaurantCard({ id, name, cuisine, rating, image, address, hours }: {
    id: number;
    name: string;
    cuisine: string;
    image: string | null;
    rating: number | null;
    address: string;
    hours: string;
}) {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <div className="aspect-video bg-muted">
                {image && <img src={image} alt={name} className="h-full w-full object-cover" />}
            </div>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-semibold">{name}</h3>
                        <Badge variant="secondary" className="mt-1">{cuisine}</Badge>
                    </div>
                    {rating && (
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{rating}</span>
                        </div>
                    )}
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {address}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {hours}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t p-4">
                <Button className="w-full" asChild>
                    <Link href={`/restaurants/${id}/book`}>Book a Table</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
