import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Restaurant = {
    id: number;
    name: string;
    description: string;
    cuisine: string;
    address: string;
    phone: string;
    opening_hours: string;
    is_active: boolean;
};

type Props = {
    restaurant: Restaurant;
};

export default function Edit({ restaurant }: Props) {
    const [form, setForm] = useState({
        name: restaurant.name,
        description: restaurant.description,
        cuisine: restaurant.cuisine,
        address: restaurant.address,
        phone: restaurant.phone,
        opening_hours: restaurant.opening_hours,
        is_active: restaurant.is_active,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.put(`/owner/restaurants/${restaurant.id}`, form);
    }

    function set(field: string, value: string | boolean) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    return (
        <>
            <Head title={`Edit ${restaurant.name}`} />

            <div className="mb-6">
                <Link href="/owner/restaurants" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to restaurants
                </Link>
                <h1 className="text-2xl font-bold">Edit {restaurant.name}</h1>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Restaurant Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" value={form.description} onChange={(e) => set('description', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cuisine">Cuisine</Label>
                                <Input id="cuisine" value={form.cuisine} onChange={(e) => set('cuisine', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input id="address" value={form.address} onChange={(e) => set('address', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="opening_hours">Opening Hours</Label>
                            <Input id="opening_hours" value={form.opening_hours} onChange={(e) => set('opening_hours', e.target.value)} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch id="is_active" checked={form.is_active} onCheckedChange={(v) => set('is_active', v)} />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Button type="submit">Save Changes</Button>
                            <Link href="/owner/restaurants">
                                <Button type="button" variant="outline">Cancel</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
