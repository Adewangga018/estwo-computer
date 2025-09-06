import { Head, Link, useForm, router } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FilterSidebar from '@/components/FilterSidebar';
import SiteFooter from '@/components/SiteFooter';

// Definisikan tipe data Product yang baru
interface Product {
    idProduct: number;
    nameProduct: string;
    price: number;
    photo: string | null;
    grade: string | null;
    detailProduct: string | null;
    created_at: string;
    linkProduct: string | null; // Ditambahkan
}

// Komponen kartu produk yang bisa digunakan kembali
const ProductCard = ({ product }: { product: Product }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg h-full">
            <CardHeader className="p-0 relative">
                <div className="aspect-square w-full bg-gray-200">
                    {product.photo ? <img src={`/storage/${product.photo}`} alt={product.nameProduct} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>}
                </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">{product.nameProduct}</CardTitle>
                    {product.grade && (
                        <Badge className="bg-yellow-500 text-white border-none shrink-0 ml-2">
                            Grade {product.grade}
                        </Badge>
                    )}
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{product.detailProduct || 'No description available.'}</p>
                <p className="text-xl font-bold text-gray-900">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span className="font-semibold">{formatDate(product.created_at)}</span>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                <Link href={route('catalog.show', product.idProduct)} className="w-full">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default function Catalog({ products, filters }: { products: Product[], filters: Record<string, string> }) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        price: filters.price || '',
        specs: filters.specs || '',
        brandProduct: filters.brandProduct || '',
        // Hapus stockProduct dari form filter
    });

    const submitFilter = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('catalog.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        router.get(route('catalog.index'));
    };

    return (
        <>
            <Head title="Catalog" />
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Product Catalog</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                        <aside className="lg:col-span-1 lg:sticky lg:top-8">
                            {/* Pastikan FilterSidebar juga disesuaikan untuk menghapus input stok */}
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
