import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Create() {
    const [form, setForm] = useState({ number: '', capacity: '', location: '' });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.post('/owner/tables', form);
    }

    return (
        <>
            <Head title="Add Table" />
            <div className="mb-6">
                <Link href="/owner/tables" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to tables
                </Link>
                <h1 className="text-2xl font-bold">Add Table</h1>
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
                            <Label htmlFor="location">Location (optional)</Label>
                            <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Patio, Window, Bar" />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button type="submit">Create Table</Button>
                            <Link href="/owner/tables"><Button type="button" variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
