import { Head, Link } from '@inertiajs/react';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-100 text-gray-800">
                {/* Header */}
                <header className="bg-white shadow-md">
                    <div className="container mx-auto flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <img src="/images/estwo-logo.png" alt="Estwo Computer" className="h-10 w-auto" />
                            <h1 className="ml-4 text-2xl font-bold">ESTWO COMPUTER</h1>
                        </div>
                        <nav className="hidden items-center space-x-8 md:flex">
                            <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
                            <Link href="/catalog" className="text-gray-600 hover:text-black">Catalog</Link>
                            <Link href="/services" className="text-gray-600 hover:text-black">Services</Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="rounded-full border border-gray-300 bg-gray-100 py-2 pl-4 pr-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                            </div>
                            <Link href="/wishlist" className="text-gray-600 hover:text-black">
                                <Heart size={24} />
                            </Link>
                            <Link href="/profile" className="text-gray-600 hover:text-black">
                                <User size={24} />
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="container mx-auto p-4">
                    {/* Promo Section */}
                    <section className="mb-8 flex flex-col items-center rounded-lg bg-white p-6 shadow-lg md:flex-row">
                        <div className="mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-black md:mb-0 md:mr-6 md:w-1/2">
                            <svg className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-center md:w-1/2 md:text-left">
                            <h2 className="mb-2 text-3xl font-bold">PROMO LAPTOP BEKAS BERKUALITAS</h2>
                            <p className="mb-4 text-gray-600">
                                Kelompok laptop bekas kondisi rapi & bergaransi ringan. Pilihan terbaik untuk mahasiswa dan profesional.
                            </p>
                            <button className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-white hover:bg-yellow-600">
                                Lebih Lanjut
                            </button>
                        </div>
                    </section>

                    {/* Popular and New Products */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Popular Products */}
                        <section className="rounded-lg bg-white p-6 shadow-lg">
                            <h3 className="mb-4 text-2xl font-bold">PRODUK POPULER</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="h-40 rounded-lg bg-yellow-500"></div>
                                <div className="h-40 rounded-lg bg-yellow-500"></div>
                            </div>
                        </section>

                        {/* New Products */}
                        <section className="rounded-lg bg-white p-6 shadow-lg">
                            <h3 className="mb-4 text-2xl font-bold">PRODUK TERBARU</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="h-40 rounded-lg bg-yellow-500"></div>
                                <div className="h-40 rounded-lg bg-yellow-500"></div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
