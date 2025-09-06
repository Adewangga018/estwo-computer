import { Link, usePage, router } from '@inertiajs/react'; // 1. Impor 'router'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, User, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function SiteHeader() {
    const { auth } = usePage().props as any;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false); // State untuk dialog

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchKeyword.trim() === '') return;
        router.get('/catalog', { search: searchKeyword }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <header className="bg-black shadow-md sticky top-0 z-40">
            {/* Mobile Header - SEKARANG DENGAN FUNGSI PENCARIAN */}
            <div className="sm:hidden px-4 py-3 text-white">
                <form onSubmit={handleSearch} className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
                    <Input
                        type="search"
                        placeholder="Cari produk..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border bg-gray-100"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </form>
            </div>

            {/* Desktop Header - SEKARANG DENGAN FUNGSI PENCARIAN */}
            <div className="hidden sm:block">
                <div className="container text-white mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="/images/estwo-logo.png" alt="Estwo Computer" className="h-10" />
                        <span className="text-2xl font-bold">Estwo Computer</span>
                    </Link>

                    <form onSubmit={handleSearch} className="relative w-1/2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Cari produk impianmu..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </form>

                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            // Jika sudah login, link ke halaman Akun
                            <Link href="/favorites">
                                <Button variant="ghost" size="icon">
                                    <Heart className="h-6 w-6" />
                                </Button>
                            </Link>
                        ) : (
                            // Jika belum login, tampilkan tombol yang membuka Dialog
                            <>
                                <Button variant="ghost" size="icon" onClick={() => setIsAuthDialogOpen(true)}>
                                    <Heart className="h-6 w-6" />
                                </Button>

                                <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle className="text-yellow-500 hover:text-yellow-600">Akses Terbatas</DialogTitle>
                                            <DialogDescription>
                                                Anda perlu masuk ke akun Anda untuk mengakses fitur ini. Silakan masuk atau daftar jika Anda belum punya akun.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end space-x-2 pt-4">
                                            <Button variant="outline" asChild className="bg-gray-900 text-white">
                                                <Link href="/register">Daftar</Link>
                                            </Button>
                                            <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                                                <Link href="/login">Masuk</Link>
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                        {/* --- AWAL LOGIKA AKUN --- */}
                        {auth.user ? (
                            // Jika sudah login, link ke halaman Akun
                            <Link href="/account">
                                <Button variant="ghost" size="icon">
                                    <User className="h-6 w-6" />
                                </Button>
                            </Link>
                        ) : (
                            // Jika belum login, tampilkan tombol yang membuka Dialog
                            <>
                                <Button variant="ghost" size="icon" onClick={() => setIsAuthDialogOpen(true)}>
                                    <User className="h-6 w-6" />
                                </Button>

                                <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle className="text-yellow-500 hover:text-yellow-600">Akses Terbatas</DialogTitle>
                                            <DialogDescription>
                                                Anda perlu masuk ke akun Anda untuk mengakses fitur ini. Silakan masuk atau daftar jika Anda belum punya akun.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex justify-end space-x-2 pt-4">
                                            <Button variant="outline" asChild className="bg-gray-900 text-white">
                                                <Link href="/register">Daftar</Link>
                                            </Button>
                                            <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                                                <Link href="/login">Masuk</Link>
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                        {/* --- AKHIR LOGIKA AKUN --- */}
                    </div>
                </div>
                <nav className="bg-gray-100">
                    <div className="container mx-auto px-4 py-2 flex justify-center">
                        <div className="flex items-center space-x-8 text-lg">
                            <Link href="/" className="hover:text-yellow-600">Home</Link>
                            <Link href="/catalog" className="hover:text-yellow-600">Catalog</Link>
                            <a
                                href="https://wa.me/6285194574812"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-yellow-600"
                            >
                                Service
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}
