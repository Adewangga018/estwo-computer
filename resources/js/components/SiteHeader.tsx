import { Link, usePage } from '@inertiajs/react';
import { Heart, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';

export default function SiteHeader() {
    const { url, props } = usePage();
    const user = (props as any).auth?.user;
    const waLink = "https://wa.me/6285194574812";

    const [showAuthModal, setShowAuthModal] = useState(false);

    const navItems = [
        { href: '/', label: 'Home' }, // Diubah ke '/'
        { href: '/catalog', label: 'Catalog' },
    ];

    const handleGuestClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowAuthModal(true);
    };

    return (
        <>
            <header className="bg-black shadow-md">
                <div className="container mx-auto flex items-center justify-between p-4 text-white">
                    <div className="flex items-center">
                        <img src="/images/estwo-logo.png" alt="Estwo Computer" className="h-10 w-auto" />
                        <h1 className="ml-4 text-2xl font-bold">ESTWO COMPUTER</h1>
                    </div>
                    <nav className="hidden items-center space-x-8 md:flex text-xl">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn('text-white hover:text-gray-300', url === item.href && 'font-semibold')}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <a href={waLink} target="_blank" rel="noopener noreferrer" className='text-white hover:text-gray-300'>
                            Services
                        </a>
                    </nav>
                    
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            {/* Fitur search tetap sama */}
                        </div>
                        {user ? (
                            <Link href="/favorites" className="text-white hover:text-gray-300">
                                <Heart size={32} />
                            </Link>
                        ) : (
                            <button onClick={handleGuestClick} className="text-white hover:text-gray-300">
                                <Heart size={32} />
                            </button>
                        )}
                        {user ? (
                            <Link href="/account" className="text-white hover:text-gray-300">
                                <User size={32} />
                            </Link>
                        ) : (
                            <button onClick={handleGuestClick} className="text-white hover:text-gray-300">
                                <User size={32} />
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Pop-up Modal untuk Login/Register */}
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Akses Terbatas</DialogTitle>
                        <DialogDescription>
                            Silakan masuk atau daftar untuk mengakses fitur ini.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-center pt-4">
                        <Button asChild variant="outline" className="w-full sm:w-auto bg-gray-200">
                            <Link href="/register">Daftar</Link>
                        </Button>
                        <Button asChild className="w-full sm:w-auto text-white bg-yellow-500 hover:bg-yellow-600">
                            <Link href="/login">Masuk</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
