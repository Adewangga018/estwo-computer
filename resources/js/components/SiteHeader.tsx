// resources/js/components/SiteHeader.tsx

import { Link, usePage } from '@inertiajs/react';
import { Heart, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SiteHeader() {
    const { url } = usePage(); // Hook untuk mendapatkan URL saat ini

    const navItems = [
        { href: '/home', label: 'Home' },
        { href: '/catalog', label: 'Catalog' },
        { href: '/services', label: 'Services' },
    ];

    return (
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
                            className={cn(
                                'text-white hover:text-gray-300',
                                url === item.href && 'font-semibold'
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="rounded-full border border-gray-300 text-black bg-gray-100 py-2 pl-4 pr-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-black" size={20} />
                    </div>
                    <Link href="#" className="text-white hover:text-gray-300">
                        <Heart size={32} />
                    </Link>
                    <Link href="/account" className="text-white hover:text-gray-300">
                        <User size={32} />
                    </Link>
                </div>
            </div>
        </header>
    );
}
