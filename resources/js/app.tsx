
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Fix: Add type declaration for import.meta.env
// Fix: Add global type declaration for ImportMeta
declare global {
    interface ImportMetaEnv {
        VITE_APP_NAME?: string;
    }
    interface ImportMeta {
        env: ImportMetaEnv;
        glob: (pattern: string) => Record<string, () => Promise<any>>;
    }
}
const appName = (import.meta.env && import.meta.env.VITE_APP_NAME) ? import.meta.env.VITE_APP_NAME : 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    // --- PERUBAHAN UTAMA DI SINI ---
    // Kita gunakan path absolut dari root folder proyek (/resources/js/...)
    // Ini jauh lebih andal daripada path relatif (./pages/...)
    resolve: (name) =>
        resolvePageComponent(
            `/resources/js/pages/${name}.tsx`,
            // Fix: Use correct pattern for Vite import.meta.glob
            import.meta.glob('/resources/js/pages/**/*.tsx')
        ),
    // --- AKHIR PERUBAHAN ---

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
