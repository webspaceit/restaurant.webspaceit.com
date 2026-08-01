import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export function useEcho(channel, event, callback) {
    const { auth } = usePage().props;

    useEffect(() => {
        if (!window.Echo || !auth.user) return;

        window.Echo.private(channel)
            .listen(event, callback);

        return () => {
            window.Echo.leave(channel);
        };
    }, [channel, event]);
}
