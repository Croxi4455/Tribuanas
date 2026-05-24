import { createInertiaApp, router } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import { toast } from 'sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Lazy-load layouts
const AppLayout      = lazy(() => import('@/layouts/app-layout'));
const AuthLayout     = lazy(() => import('@/layouts/auth-layout'));
const SettingsLayout = lazy(() => import('@/layouts/settings/layout'));

// Public pages that manage their own layout (Navbar + Footer)
const PUBLIC_PAGES = new Set([
    'welcome', 'error',
    'berita', 'berita-detail',
    'layanan', 'layanan-detail',
    'pelatihan', 'pelatihan-detail',
    'mitra', 'galeri', 'kontak',
    'karir', 'karir-detail',
]);

// Flash toast — register globally, client-only, no React hooks
if (typeof window !== 'undefined') {
    // Prevent duplicate listeners on HMR
    if (!(window as any).__flashToastRegistered) {
        (window as any).__flashToastRegistered = true;
        router.on('success', (event) => {
            const flash = (event as any).detail?.page?.props?.flash;
            if (!flash) return;
            const msg = flash.success || flash.error || flash.info || '';
            if (!msg) return;

            // Deduplicate: toast.dismiss then show
            toast.dismiss();
            setTimeout(() => {
                if (flash.success) toast.success(flash.success);
                else if (flash.error) toast.error(flash.error);
                else if (flash.info) toast.info(flash.info);
            }, 50);
        });
    }
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx');
        const page  = pages[`./pages/${name}.tsx`];
        if (!page) throw new Error(`Page not found: ${name}`);
        return page();
    },

    layout: (name) => {
        if (PUBLIC_PAGES.has(name)) return null;
        if (name.startsWith('auth/'))     return AuthLayout;
        if (name.startsWith('settings/')) return [AppLayout, SettingsLayout];
        return AppLayout;
    },

    strictMode: true,

    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                <Suspense fallback={null}>
                    {app}
                </Suspense>
                <Toaster richColors position="top-right" toastOptions={{ duration: 3000 }} visibleToasts={1} />
            </TooltipProvider>
        );
    },

    progress: {
        color: '#F5B800',
        showSpinner: false,
        delay: 100,
    },
});

initializeTheme();
