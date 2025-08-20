// resources/js/pages/Catalog.tsx

import { Head, Link } from '@inertiajs/react';
import { Heart, Search, User } from 'lucide-react';
import FilterSidebar from '@/components/FilterSidebar';
import ProductList from '@/components/ProductList';
import SiteHeader from '@/components/SiteHeader';

// Definisikan tipe data untuk produk
interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

export default function Catalog({ products }: { products: Product[] }) {
    return (
        <>
            <Head title="Katalog Produk" />
            <div className="min-h-screen bg-gray-100 text-gray-800">
                {/* Header (Sama seperti di halaman Home) */}
                <SiteHeader />

                {/* Main Content */}
                <main className="container mx-auto p-4 lg:p-8">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Filter Sidebar */}
                        <aside className="w-full lg:w-1/4">
                            <FilterSidebar />
                        </aside>

                        {/* Product List */}
                        <section className="w-full lg:w-3/4">
                            <ProductList products={products} />
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
