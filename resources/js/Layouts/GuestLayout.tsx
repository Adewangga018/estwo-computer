import React from 'react';

// Layout ini hanya me-render konten halaman tanpa header atau footer
export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            {children}
        </main>
    );
}
