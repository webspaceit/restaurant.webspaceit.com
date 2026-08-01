import { Head, Link } from '@inertiajs/react';
import { Plus, UtensilsCrossed, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Menu = { id: number; name: string; description: string | null; is_active: boolean; items_count: number };

type Props = { menus: Menu[] };

export default function Index({ menus }: Props) {
    return (
        <>
            <Head title="Menus" />
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Menus</h1>
                    <p className="text-muted-foreground mt-1">Manage your restaurant menus</p>
                </div>
                <Link href="/owner/menus/create">
                    <Button><Plus className="mr-2 h-4 w-4" /> Create Menu</Button>
                </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {menus.map((menu) => (
                    <Card key={menu.id}>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg">{menu.name}</CardTitle>
                                <Badge variant={menu.is_active ? 'default' : 'secondary'}>{menu.is_active ? 'Active' : 'Inactive'}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{menu.description || 'No description'}</p>
                            <p className="text-xs text-muted-foreground mt-2">{menu.items_count} items</p>
                            <div className="flex gap-2 mt-4">
                                <Link href={`/owner/menus/${menu.id}/edit`}><Button variant="outline" size="sm"><Pencil className="mr-1 h-3 w-3" /> Edit</Button></Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {menus.length === 0 && (
                    <p className="col-span-full py-12 text-center text-muted-foreground">No menus yet. Create your first one!</p>
                )}
            </div>
        </>
    );
}
