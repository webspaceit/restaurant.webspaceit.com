import { usePage } from '@inertiajs/react';

export function usePermissions() {
    const { auth } = usePage().props;

    return {
        isAdmin: auth.user?.roles?.includes('admin') ?? false,
        isOwner: auth.user?.roles?.includes('owner') ?? false,
        isCustomer: auth.user?.roles?.includes('customer') ?? false,
        hasRole: (role) => auth.user?.roles?.includes(role) ?? false,
    };
}
