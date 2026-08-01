import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Table = { id: number; number: number; capacity: number; location: string | null };

type Props = { table: Table };

export default function Edit({ table }: Props) {
    const [form, setForm] = useState({ number: String(table.number), capacity: String(table.capacity), location: table.location || '' });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.put(`/owner/tables/${table.id}`, form);
    }

    return (
        <>
            <Head title="Edit Table" />
            <div className="mb-6">
                <Link href="/owner/tables" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to tables
                </Link>
                <h1 className="text-2xl font-bold">Edit Table {table.number}</h1>
            </div>
            <Card className="max-w-lg">
                <CardHeader><CardTitle>Table Details</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="number">Table Number</Label>
                            <Input id="number" type="number" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Seating Capacity</Label>
                            <Input id="capacity" type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button type="submit">Save Changes</Button>
                            <Link href="/owner/tables"><Button type="button" variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
