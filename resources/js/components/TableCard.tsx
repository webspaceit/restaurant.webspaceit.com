import { Users, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Table = { id: number; number: number; capacity: number; status: string; location: string | null };

type Props = { table: Table; onEdit?: (id: number) => void; onDelete?: (id: number) => void };

const statusColor: Record<string, string> = {
    available: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
    occupied: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    reserved: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
};

export function TableCard({ table, onEdit, onDelete }: Props) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">Table {table.number}</CardTitle>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusColor[table.status] || statusColor.available)}>
                        {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    <span>Up to {table.capacity} guests</span>
                </div>
                {table.location && <p className="text-xs text-muted-foreground mb-3">{table.location}</p>}
                <div className="flex gap-2 mt-3">
                    {onEdit && <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(table.id)}><Pencil className="mr-1 h-3 w-3" /> Edit</Button>}
                    {onDelete && <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(table.id)}><Trash2 className="mr-1 h-3 w-3" /> Remove</Button>}
                </div>
            </CardContent>
        </Card>
    );
}
