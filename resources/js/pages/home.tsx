import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/global';

const ProductCard = ({ product }: { product: Product }) => (
    // Untuk mobile, kartu akan memiliki lebar tetap agar bisa di-scroll
    <div className="w-[150px] sm:w-full flex-shrink-0">
        <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="relative p-0">
                <div className="aspect-square w-full bg-gray-200">
                    {product.photo ? (
                        <img
                            src={`/storage/${product.photo}`}
                            alt={product.nameProduct}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </div>
                {product.grade && (
                    <div className="absolute right-3 top-3">
                        <span className="rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                            Grade {product.grade}
                        </span>
                    </div>
                )}
            </CardHeader>
            <CardContent className="flex flex-grow flex-col p-2">
                <div className="mb-1">
                    <CardTitle className="text-sm font-semibold text-gray-800 line-clamp-2">
                        {product.nameProduct}
                    </CardTitle>
                </div>
            </CardContent>
            <CardFooter className="mt-auto flex flex-col items-stretch p-2 pt-0">
                <div className="mb-2 flex items-end justify-between">
                    <div className="text-left">
                        {product.isDiscount && product.priceDiscount !== null ? (
                            <div>
                                <div className="flex items-center gap-1">
                                    <p className="text-xs text-red-600 line-through">
                                        {formatCurrency(product.price)}
                                    </p>
                                    {product.discountPercentage > 0 && (
                                        <span className="rounded bg-red-100 px-1 py-0.5 text-[0.5rem] font-medium text-red-800">
                                            {product.discountPercentage}%
                                        </span>
                                    )}
                                </div>
                                <p className="text-md font-bold text-gray-900">
                                    {formatCurrency(product.priceDiscount)}
                                </p>
                            </div>
                        ) : (
                            <p className="text-md font-bold text-gray-900">
                                {formatCurrency(product.price)}
                            </p>
                        )}
                    </div>
                </div>
                <Link href={route('catalog.show', product.idProduct)} className="w-full">
                    <Button className="w-full h-8 text-xs bg-yellow-500 text-white hover:bg-yellow-600">
                        Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    </div>
);


export default function Home({ popularProducts, newestProducts, products }: { popularProducts: Product[]; newestProducts: Product[]; products: Product[] }) {
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowAlert(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const promoProducts = products.filter(p => p.isDiscount);

    return (
        <>
            <Head title="Home" />
            <div className="relative bg-gray-100 text-gray-800">
                <div
                    className={cn(
                        'fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-lg bg-white p-4 shadow-lg transition-all duration-500',
                        showAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
                    )}
                >
                    <button onClick={() => setShowAlert(false)} className="absolute top-1 right-1 p-1 text-gray-600 hover:text-black">
                        <X size={16} />
                    </button>
                    <p className="text-center text-sm">Selamat Datang di <strong>Estwo Computer</strong>👋! Tempat terbaik untuk laptop bekas berkualitas</p>
                </div>

                <main className="container mx-auto p-4">
                    {/* SECTION DISKON NGAMUK */}
                    <section className="mb-8 rounded-lg bg-gradient-to-r from-red-600 to-yellow-500 p-6 text-white shadow-lg">
                        {/* Wrapper untuk Desktop */}
                        <div className="hidden md:flex flex-col md:flex-row items-center justify-center gap-6">
                             {/* Kolom Kiri: Narasi */}
                             <div className="flex w-full flex-col items-center text-center md:w-1/3 md:items-start md:text-left">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mb-4 h-24 w-24 text-yellow-300 drop-shadow-lg">
                                    <path fillRule="evenodd" d="M14.615 1.585a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l2.965-7.19H4.5a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                                </svg>
                                <h2 className="mb-2 text-4xl font-bold drop-shadow-md">DISKON NGAMUK!</h2>
                                <p className="text-justify font-bold text-yellow-50 md:text-left">
                                    Ini dia laptop pilihan dengan diskon paling gila! Harga sudah kami pangkas habis, kualitas tetap terjamin.
                                </p>
                                <p className="mt-4 text-xs italic text-yellow-200">
                                    (Promo diperbarui setiap hari Senin)
                                </p>
                                <Link href="/catalog" className="mt-4">
                                    <Button className="rounded-lg bg-white px-8 py-3 font-bold text-red-600 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-yellow-100">
                                        Lihat Semua Produk
                                    </Button>
                                </Link>
                            </div>
                            {/* Kolom Kanan: Tampilan Produk Promo */}
                            <div className="w-full md:flex-1">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {promoProducts.slice(0, 4).map(product => (
                                        <ProductCard key={product.idProduct} product={product} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Wrapper untuk Mobile dengan Horizontal Scroll */}
                        <div className="md:hidden">
                            <div className="flex flex-col items-center text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" h-20 w-20 text-yellow-300 drop-shadow-lg">
                                    <path fillRule="evenodd" d="M14.615 1.585a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l2.965-7.19H4.5a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                                </svg>
                                <h2 className="text-3xl font-bold drop-shadow-md">DISKON NGAMUK!</h2>
                                 <p className="text-xs italic text-yellow-200">
                                    (Promo diperbarui setiap hari Senin)
                                </p>
                            </div>
                            <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                                {promoProducts.map(product => (
                                    <ProductCard key={product.idProduct} product={product} />
                                ))}
                            </div>
                             <Link href="/catalog" className="mt-4 flex justify-center">
                                <Button className="rounded-lg bg-white px-8 py-3 font-bold text-red-600 shadow-md transition-transform duration-200 hover:scale-105 hover:bg-yellow-100">
                                    Lihat Semua Produk
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* Section Produk Populer & Terbaru */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <section className="rounded-lg bg-white p-4 shadow-lg">
                            <h3 className="mb-4 text-2xl font-bold text-center">PRODUK TERBAIK</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {popularProducts.map(product => <ProductCard key={product.idProduct} product={product} />)}
                            </div>
                        </section>
                        <section className="rounded-lg bg-white p-4 shadow-lg">
                            <h3 className="mb-4 text-2xl font-bold text-center">PRODUK TERBARU</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {newestProducts.map(product => <ProductCard key={product.idProduct} product={product} />)}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
