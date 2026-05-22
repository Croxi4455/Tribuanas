import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useFlashToast(): void {
    useEffect(() => {
        return router.on('finish', (event) => {
            const page = (event as any).detail?.page;
            if (!page?.props?.flash) return;

            const flash = page.props.flash;
            if (flash.success) toast.success(flash.success);
            else if (flash.error) toast.error(flash.error);
            else if (flash.info) toast.info(flash.info);
        });
    }, []);
}
