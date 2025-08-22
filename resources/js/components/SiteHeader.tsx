import { Link, usePage, router } from '@inertiajs/react'; // 1. Impor router
import { Heart, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react'; // 2. Impor hook

export default function SiteHeader() {
    const { url, props } = usePage();
    const filters = (props as any).filters || {}; // Ambil filter dari props

    const waLink = "https://wa.me/6285186882834";

    const navItems = [
        { href: '/home', label: 'Home' },
        { href: '/catalog', label: 'Catalog' },
    ];

    // 3. Buat state untuk search term
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    // Sinkronkan state jika filter dari URL berubah
    useEffect(() => {
        setSearchTerm(filters.search || '');
    }, [filters.search]);


    // 4. Fungsi untuk menangani pencarian
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Arahkan ke halaman katalog dengan parameter pencarian
        router.get(route('catalog.index'), { search: searchTerm }, {
            preserveState: true,
            replace: true,
        });
    };

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
                    {/* 5. Jadikan search box sebagai form */}
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search Product"
                            className="rounded-full border border-gray-300 text-black bg-gray-100 py-2 pl-4 pr-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 transform text-black">
                           <Search size={20} />
                        </button>
                    </form>
                    <Link href="/favorites" className="text-white hover:text-gray-300">
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
