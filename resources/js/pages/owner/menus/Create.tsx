import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Create() {
    const [form, setForm] = useState({ name: '', description: '' });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.post('/owner/menus', form);
    }

    return (
        <>
            <Head title="Create Menu" />
            <div className="mb-6">
                <Link href="/owner/menus" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
                    <ArrowLeft className="h-4 w-4" /> Back to menus
                </Link>
                <h1 className="text-2xl font-bold">Create Menu</h1>
            </div>
            <Card className="max-w-xl">
                <CardHeader><CardTitle>Menu Details</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Menu Name</Label>
                            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="e.g. Dinner Menu" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description (optional)</Label>
                            <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button type="submit">Create Menu</Button>
                            <Link href="/owner/menus"><Button type="button" variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
