import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type User = {
    id: number;
    name: string;
    email: string;
    roles: { id: number; name: string }[];
};

type Props = {
    users: {
        data: User[];
        total: number;
    };
};

export default function Index({ users }: Props) {
    return (
        <>
            <Head title="Manage Users" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
                <p className="text-muted-foreground mt-1">
                    All registered users on the platform
                </p>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Roles</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((u) => (
                            <TableRow key={u.id}>
                                <TableCell className="font-medium">{u.name}</TableCell>
                                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1 flex-wrap">
                                        {u.roles.map((role) => (
                                            <Badge key={role.id} variant="secondary">{role.name}</Badge>
                                        ))}
                                        {u.roles.length === 0 && (
                                            <span className="text-muted-foreground text-sm">—</span>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.data.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
