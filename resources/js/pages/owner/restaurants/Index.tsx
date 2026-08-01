import { Head, Link } from '@inertiajs/react';
import { Plus, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Restaurant = {
    id: number;
    name: string;
    cuisine: string;
    address: string;
    is_active: boolean;
};

type Props = {
    restaurants: Restaurant[];
};

export default function Index({ restaurants }: Props) {
    return (
        <>
            <Head title="My Restaurants" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Restaurants</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your restaurant listings
                    </p>
                </div>
                <Link href="/owner/restaurants/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Restaurant
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {restaurants.map((r) => (
                    <Card key={r.id}>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg">{r.name}</CardTitle>
                                <Badge variant={r.is_active ? 'default' : 'secondary'}>
                                    {r.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{r.cuisine}</p>
                            <p className="text-sm text-muted-foreground mt-1">{r.address}</p>
                            <div className="mt-4 flex gap-2">
                                <Link href={`/owner/restaurants/${r.id}/edit`}>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </Link>
                                <Link href={`/restaurants/${r.id}`}>
                                    <Button variant="ghost" size="sm">View</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {restaurants.length === 0 && (
                    <p className="col-span-full py-12 text-center text-muted-foreground">
                        No restaurants yet. Create your first one!
                    </p>
                )}
            </div>
        </>
    );
}
