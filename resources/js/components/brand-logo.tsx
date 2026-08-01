import { usePage } from '@inertiajs/react';

import AppLogoIcon from '@/components/app-logo-icon';
import { cn } from '@/lib/utils';

export default function BrandLogo({ className }: { className?: string }) {
    const { branding } = usePage().props;
    const src = branding?.login_logo_url ?? branding?.logo_url ?? null;

    if (src) {
        return (
            <img
                src={src}
                alt="Brand logo"
                className={cn('object-contain', className)}
            />
        );
    }

    return <AppLogoIcon className={className} />;
}
