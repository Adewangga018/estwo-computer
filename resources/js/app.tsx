import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import MainLayout from './Layouts/MainLayout';
import React from 'react';

createInertiaApp({
    title: (title) => `${title} - Estwo Computer`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        let page: any = pages[`./pages/${name}.tsx`];

        // Cek apakah halaman punya layout sendiri. Jika tidak, gunakan MainLayout.
        page.default.layout = page.default.layout || ((pageComponent: React.ReactNode) => <MainLayout>{pageComponent}</MainLayout>);

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
