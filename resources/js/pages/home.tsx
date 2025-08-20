import { Head, Link } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';
import { Heart, Search, ShoppingCart, User } from 'lucide-react';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-100 text-gray-800">
                {/* Header */}
                <SiteHeader /> {/* <-- Gunakan komponen di sini */}
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
