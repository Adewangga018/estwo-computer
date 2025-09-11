import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/global';

// Komponen kartu produk
const ProductCard = ({ product }: { product: Product }) => (
    // Untuk mobile, kartu akan memiliki lebar tetap agar bisa di-scroll
    <div className="w-[150px] sm:w-full flex-shrink-0">
        <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader className="relative p-0">
                <div className="aspect-square w-full bg-gray-200 overflow-hidden">
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

// Halaman Favorit utama
export default function Favorites({ products }: { products: Product[] }) {
    return (
        <>
            <Head title="My Favorites" />
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">My Favorite Products</h1>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map((product) => (
                                <ProductCard key={product.idProduct} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg shadow">
                            <p className="text-xl text-gray-500">You haven't added any favorite products yet.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
