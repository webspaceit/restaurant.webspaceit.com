import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type MenuItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
};

type Props = {
    item: MenuItem;
    onAdd?: (item: MenuItem) => void;
};

export function MenuItemCard({ item, onAdd }: Props) {
    return (
        <Card className="overflow-hidden">
            {item.image && (
                <div className="aspect-video w-full overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                </div>
            )}
            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                        ${Number(item.price).toFixed(2)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <p className="text-xs text-muted-foreground mt-2 capitalize">{item.category}</p>
            </CardContent>
            {onAdd && (
                <CardFooter>
                    <Button size="sm" className="w-full" onClick={() => onAdd(item)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Cart
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
