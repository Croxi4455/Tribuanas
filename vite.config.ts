import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({ formVariants: true }),
    ],

    build: {
        // Target modern browsers — smaller output
        target: 'es2020',

        // Raise chunk warning threshold (GSAP is ~130kb minified)
        chunkSizeWarningLimit: 600,

        rollupOptions: {
            output: {
                // Manual chunk splitting — keeps vendor bundles separate
                // so pages only load what they need
                manualChunks(id) {
                    // GSAP — only loaded by pages that use animations
                    if (id.includes('gsap')) return 'gsap';

                    // Radix UI — admin panel only
                    if (id.includes('@radix-ui')) return 'radix';

                    // Inertia + React core
                    if (id.includes('@inertiajs') || id.includes('react-dom') || id.includes('/react/')) return 'framework';

                    // Lucide icons — large, shared across pages
                    if (id.includes('lucide-react')) return 'icons';
                },
            },
        },

        // Enable CSS code splitting
        cssCodeSplit: true,

        // Minify with esbuild (default, fastest)
        minify: 'esbuild',
    },

    // Faster dev server
    server: {
        warmup: {
            clientFiles: [
                './resources/js/app.tsx',
                './resources/js/pages/welcome.tsx',
            ],
        },
    },
});
