import { Head, Link, useForm, router } from '@inertiajs/react';
import { Filter } from 'lucide-react'; // <--- TAMBAHKAN BARIS INI
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FilterSidebar from '@/components/FilterSidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/global';

// Komponen kartu produk yang bisa digunakan kembali
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
                            className="h-full w-full object-cover object-center"
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

export default function Catalog({ products, filters }: { products: Product[], filters: Record<string, string> }) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        price: filters.price || '',
        type: filters.type || '',
        specs: filters.specs || '',
        brandProduct: filters.brandProduct || '',
        // Hapus stockProduct dari form filter
    });

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const submitFilter = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('catalog.index'), {
            preserveState: true,
            replace: true,
            onSuccess: () => setIsFilterOpen(false), // Tutup sheet setelah filter diterapkan
        });
    };

    const resetFilters = () => {
        router.get(route('catalog.index'));
        setIsFilterOpen(false); // Tutup sheet setelah reset
    };

    return (
        <>
            <Head title="Catalog" />
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto py-4 px-2">
                    <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">Our Product Catalog</h1>
                    <div className="lg:hidden">
                            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="m-5w">
                                        <Filter className="mr-2 h-4 w-4" />
                                        Filter
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                    <SheetHeader>
                                        <SheetTitle>Filter Products</SheetTitle>
                                    </SheetHeader>
                                    {/* Render FilterSidebar di dalam Sheet */}
                                    <FilterSidebar
                                        data={data}
                                        setData={setData}
                                        submit={submitFilter}
                                        reset={resetFilters}
                                        processing={processing}
                                    />
                                </SheetContent>
                            </Sheet>
                        </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                        <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-8">
                            <FilterSidebar
                                data={data}
                                setData={setData}
                                submit={submitFilter}
                                reset={resetFilters}
                                processing={processing}
                            />
                        </aside>
                        <div className="lg:col-span-3">
                            {products.length > 0 ? (
                                <div className="justify-items-center grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {products.map((product) => (
                                        <ProductCard key={product.idProduct} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-lg shadow">
                                    <p className="text-xl text-gray-500">No products match your filter.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
