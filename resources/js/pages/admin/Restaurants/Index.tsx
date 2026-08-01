import { Head, Link } from '@inertiajs/react';
import { Store, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Restaurant = {
    id: number;
    name: string;
    cuisine: string;
    address: string;
    is_active: boolean;
    owner: { id: number; name: string; email: string };
};

type Props = {
    restaurants: {
        data: Restaurant[];
        total: number;
    };
};

export default function Index({ restaurants }: Props) {
    return (
        <>
            <Head title="Manage Restaurants" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Restaurants</h1>
                <p className="text-muted-foreground mt-1">
                    All restaurants on the platform
                </p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Cuisine</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {restaurants.data.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell className="font-medium">{r.name}</TableCell>
                                <TableCell className="text-muted-foreground">{r.owner.name}</TableCell>
                                <TableCell>{r.cuisine}</TableCell>
                                <TableCell>
                                    <Badge variant={r.is_active ? 'default' : 'secondary'}>
                                        {r.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/restaurants/${r.id}`}>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                        {restaurants.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                    No restaurants found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
