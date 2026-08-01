import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { GripVertical, Plus, Pencil, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
};

type Props = {
    menuItems: MenuItem[];
};

export default function Edit({ menuItems: initialItems }: Props) {
    const [items, setItems] = useState<MenuItem[]>(initialItems);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newItem, setNewItem] = useState<Partial<MenuItem>>({});

    const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Sides'];

    const addItem = () => {
        if (!newItem.name || !newItem.price) return;
        const id = crypto.randomUUID();
        setItems([...items, { id, name: newItem.name, description: newItem.description || '', price: Number(newItem.price), category: newItem.category || 'Main Course' }]);
        setNewItem({});
    };

    const removeItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newItems.length) return;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        setItems(newItems);
    };

    return (
        <>
            <Head title="Menu Editor" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Menu Editor</h1>
                        <p className="text-muted-foreground mt-1">
                            Drag to reorder, edit, or add new menu items
                        </p>
                    </div>
                    <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Menu
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-3">
                        {items.map((item, index) => (
                            <Card key={item.id}>
                                <CardContent className="flex items-start gap-3 p-4">
                                    <button className="mt-1 cursor-grab text-muted-foreground hover:text-foreground">
                                        <GripVertical className="h-5 w-5" />
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-medium">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <span className="font-medium shrink-0 ml-2">
                                                ${Number(item.price).toFixed(2)}
                                            </span>
                                        </div>
                                        <span className="text-xs text-muted-foreground capitalize">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="size-8 text-destructive" onClick={() => removeItem(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {items.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No menu items yet. Add your first item below.</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Add Menu Item</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={newItem.name || ''}
                                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                        placeholder="Item name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="desc">Description</Label>
                                    <Textarea
                                        id="desc"
                                        value={newItem.description || ''}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                        placeholder="Brief description"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        value={newItem.price || ''}
                                        onChange={(e) => setNewItem({ ...newItem, price: e.target.valueAsNumber })}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={newItem.category || 'Main Course'}
                                        onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button className="w-full" onClick={addItem} disabled={!newItem.name || !newItem.price}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Item
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
