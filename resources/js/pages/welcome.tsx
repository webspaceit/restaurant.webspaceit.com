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
                {/* Navigation */}
                <header className="border-b">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <Link href={home().url} className="text-xl font-bold text-[#007C47]">
                            RestaurantApp
                        </Link>
                        <nav className="flex items-center gap-4">
                            <Link href={login().url}>
                                <Button variant="ghost" className="text-[#007C47] hover:text-[#005c34]">
                                    Log in
                                </Button>
                            </Link>
                            <Link href={register().url}>
                                <Button className="bg-[#007C47] hover:bg-[#005c34]">
                                    Sign up
                                </Button>
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-b from-[#007C47]/5 to-background py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-gray-900">
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
                                <Button type="submit" className="rounded-full bg-[#007C47] hover:bg-[#005c34]">
                                    Search
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Featured Restaurants */}
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900">Featured Restaurants</h2>
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

                {/* Features Section */}
                <section className="bg-[#007C47]/5 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
                            <p className="mt-2 text-muted-foreground">The best platform for restaurant reservations</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#007C47]/10">
                                    <Search className="h-8 w-8 text-[#007C47]" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Easy Discovery</h3>
                                <p className="text-sm text-muted-foreground">Find the perfect restaurant with advanced search and filters</p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#007C47]/10">
                                    <Clock className="h-8 w-8 text-[#007C47]" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Instant Booking</h3>
                                <p className="text-sm text-muted-foreground">Reserve tables in seconds with real-time availability</p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#007C47]/10">
                                    <Star className="h-8 w-8 text-[#007C47]" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Best Experience</h3>
                                <p className="text-sm text-muted-foreground">Enjoy curated dining experiences at top restaurants</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#007C47] py-16">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-white">Ready to Get Started?</h2>
                        <p className="mt-4 text-lg text-white/90">
                            Join thousands of users who trust RestaurantApp for their dining needs
                        </p>
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4">
                            <Link href={register().url}>
                                <Button size="lg" className="bg-white text-[#007C47] hover:bg-gray-100">
                                    Create Free Account
                                </Button>
                            </Link>
                            <Link href={login().url}>
                                <Button size="lg" variant="outline" className="bg-white text-[#007C47] hover:bg-gray-100">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t py-8">
                    <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
                        <p>&copy; {new Date().getFullYear()} RestaurantApp. All rights reserved.</p>
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
                        <h3 className="font-semibold text-gray-900">{name}</h3>
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
                <Button className="w-full bg-[#007C47] hover:bg-[#005c34]" asChild>
                    <Link href={`/restaurants/${id}/book`}>Book a Table</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}