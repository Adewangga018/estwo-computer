import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MobileBottomNav from '@/components/MobileBottomNav';
import React from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const isDesktop = useMediaQuery('(min-width: 640px)');

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <SiteHeader />

            {/* Beri padding bawah HANYA jika bukan desktop (untuk MobileBottomNav) */}
            <main className={`flex-grow ${!isDesktop ? 'pb-16' : ''}`}>
                {children}
            </main>

            {/* UBAH BAGIAN INI:
              Hapus kondisi `{isDesktop && ...}` agar SiteFooter selalu ditampilkan,
              baik di desktop maupun di mobile.
            */}
            <SiteFooter />

            {/* Tampilkan MobileBottomNav HANYA jika BUKAN isDesktop */}
            {!isDesktop && <MobileBottomNav />}
        </div>
    );
}
