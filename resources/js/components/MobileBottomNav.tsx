import { Link, usePage } from '@inertiajs/react';
import { Home, LayoutGrid, Star, Heart, User } from 'lucide-react';
import { useState } from 'react'; // 1. Impor useState
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; // 2. Impor komponen Dialog
import { Button } from '@/components/ui/button';

export default function MobileBottomNav() {
    const { url, props } = usePage();
    const auth = (props as any).auth;

    // 3. Tambahkan state untuk mengontrol dialog
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/catalog', label: 'Catalog', icon: LayoutGrid },
        { href: '/review', label: 'Review', icon: Star, external: false },
        // { href: '/favorites', label: 'Favorite', icon: Heart },
        // // Kita akan tangani 'Account' secara terpisah
    ];

    return (
        <>
            <div className="sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
                <div className="grid h-full grid-cols-5 mx-auto font-medium">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        // Jika ini adalah link eksternal (WhatsApp)
                        if (item.external) {
                            return (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 group"
                                >
                                    <Icon className="w-6 h-6 mb-1 text-gray-500 group-hover:text-yellow-600" />
                                    <span className="text-sm group-hover:text-yellow-600">{item.label}</span>
                                </a>
                            );
                        }

                        // Untuk link internal biasa
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
                                    url === item.href ? 'text-yellow-800' : 'text-gray-500'
                                }`}
                            >
                                <Icon className={`w-6 h-6 mb-1 ${
                                    url === item.href ? 'text-yellow-800' : 'text-gray-500 group-hover:text-yellow-600'
                                }`} />
                                <span className="text-sm group-hover:text-yellow-600">{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* --- AWAL LOGIKA KHUSUS UNTUK TOMBOL ACCOUNT --- */}
                    {auth.user ? (
                        // Jika sudah login, arahkan ke /account
                        <Link
                            href="/favorites"
                            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
                                url === '/favorites' ? 'text-yellow-800' : 'text-gray-500'
                            }`}
                        >
                            <Heart className={`w-6 h-6 mb-1 ${
                                url === '/account' ? 'text-yellow-800' : 'text-gray-500 group-hover:text-yellow-600'
                            }`} />
                            <span className="text-sm group-hover:text-yellow-600">Favorite</span>
                        </Link>
                    ) : (
                        // Jika belum login, buka dialog
                        <button
                            onClick={() => setIsAuthDialogOpen(true)}
                            className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 group"
                        >
                            <Heart className="w-6 h-6 mb-1 text-gray-500 group-hover:text-yellow-600" />
                            <span className="text-sm group-hover:text-yellow-600">Favorite</span>
                        </button>
                    )}
                    {/* --- AKHIR LOGIKA KHUSUS UNTUK TOMBOL ACCOUNT --- */}

                    {/* --- AWAL LOGIKA KHUSUS UNTUK TOMBOL ACCOUNT --- */}
                    {auth.user ? (
                        // Jika sudah login, arahkan ke /account
                        <Link
                            href="/account"
                            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
                                url === '/account' ? 'text-yellow-800' : 'text-gray-500'
                            }`}
                        >
                            <User className={`w-6 h-6 mb-1 ${
                                url === '/account' ? 'text-yellow-800' : 'text-gray-500 group-hover:text-yellow-600'
                            }`} />
                            <span className="text-sm group-hover:text-yellow-600">Account</span>
                        </Link>
                    ) : (
                        // Jika belum login, buka dialog
                        <button
                            onClick={() => setIsAuthDialogOpen(true)}
                            className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 group"
                        >
                            <User className="w-6 h-6 mb-1 text-gray-500 group-hover:text-yellow-600" />
                            <span className="text-sm group-hover:text-yellow-600">Account</span>
                        </button>
                    )}
                    {/* --- AKHIR LOGIKA KHUSUS UNTUK TOMBOL ACCOUNT --- */}
                </div>
            </div>

            {/* Komponen Dialog (Pop-up) */}
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-yellow-500">Akses Terbatas</DialogTitle>
                        <DialogDescription>
                            Anda perlu masuk ke akun Anda untuk mengakses fitur ini. Silakan masuk atau daftar jika Anda belum punya akun.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" asChild className="bg-gray-800 text-white">
                            <Link href="/register">Daftar</Link>
                        </Button>
                        <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                            <Link href="/login">Masuk</Link>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
