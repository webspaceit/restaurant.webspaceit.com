import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type Flash = {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
};

export function FlashMessages() {
    const flash = usePage().props.flash as Flash | undefined;

    useEffect(() => {
        if (!flash) return;
        if (flash.success) toast.success(flash.success, { icon: <CheckCircle className="h-4 w-4" /> });
        if (flash.error) toast.error(flash.error, { icon: <XCircle className="h-4 w-4" /> });
        if (flash.warning) toast.warning(flash.warning, { icon: <AlertCircle className="h-4 w-4" /> });
        if (flash.info) toast.info(flash.info, { icon: <Info className="h-4 w-4" /> });
    }, [flash]);

    return null;
}
