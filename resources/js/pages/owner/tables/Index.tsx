import { Head, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, Users, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type Table = {
    id: string;
    number: number;
    capacity: number;
    location: string | null;
    status: 'available' | 'occupied' | 'reserved';
};

type Props = {
    tables: Table[];
};

export default function Index({ tables }: Props) {
    const [deleting, setDeleting] = useState<string | null>(null);
    const [addOpen, setAddOpen] = useState(false);
    const [newNumber, setNewNumber] = useState('');
    const [newCapacity, setNewCapacity] = useState('');
    const [newLocation, setNewLocation] = useState('');

    const [deleteConfirm, setDeleteConfirm] = useState<Table | null>(null);

    const addTable = () => {
        if (!newNumber || !newCapacity) return;
        router.post('/owner/tables', {
            number: Number(newNumber),
            capacity: Number(newCapacity),
            location: newLocation || undefined,
        }, {
            onSuccess: () => {
                setAddOpen(false);
                setNewNumber('');
                setNewCapacity('');
                setNewLocation('');
            },
            preserveState: false,
        });
    };

    const removeTable = (id: string) => {
        setDeleting(id);
        router.delete(`/owner/tables/${id}`, {
            onFinish: () => setDeleting(null),
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const statusColor: Record<string, string> = {
        available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
        occupied: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        reserved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    };

    return (
        <>
            <Head title="Table Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Table Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage your restaurant table layout and capacity
                        </p>
                    </div>

                    <Dialog open={addOpen} onOpenChange={setAddOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Table
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add New Table</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="table-number">Table Number</Label>
                                    <Input
                                        id="table-number"
                                        type="number"
                                        value={newNumber}
                                        onChange={(e) => setNewNumber(e.target.value)}
                                        placeholder="e.g. 1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Seating Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        value={newCapacity}
                                        onChange={(e) => setNewCapacity(e.target.value)}
                                        placeholder="e.g. 4"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location (optional)</Label>
                                    <Input
                                        id="location"
                                        value={newLocation}
                                        onChange={(e) => setNewLocation(e.target.value)}
                                        placeholder="e.g. Indoor, Patio, Bar"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
                                <Button onClick={addTable} disabled={!newNumber || !newCapacity}>
                                    Add Table
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {tables.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        <Users className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p className="font-medium">No tables added yet</p>
                        <p className="text-sm mt-1">Start by adding your first table.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {tables.map((table) => (
                            <Card key={table.id}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg">Table {table.number}</CardTitle>
                                        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusColor[table.status])}>
                                            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                        <Users className="h-4 w-4" />
                                        <span>Up to {table.capacity} {table.capacity === 1 ? 'guest' : 'guests'}</span>
                                        {table.location && <span>· {table.location}</span>}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1" asChild>
                                            <Link href={`/owner/tables/${table.id}/edit`}>
                                                <Pencil className="mr-2 h-3 w-3" />
                                                Edit
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => setDeleteConfirm(table)}
                                        >
                                            <Trash2 className="mr-2 h-3 w-3" />
                                            Remove
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={deleteConfirm !== null} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Remove Table {deleteConfirm?.number}?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-muted-foreground">
                        This will permanently delete Table {deleteConfirm?.number} and all its data. This action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                        <Button
                            variant="destructive"
                            disabled={deleting === deleteConfirm?.id}
                            onClick={() => deleteConfirm && removeTable(deleteConfirm.id)}
                        >
                            {deleting === deleteConfirm?.id ? 'Removing...' : 'Yes, Remove'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
