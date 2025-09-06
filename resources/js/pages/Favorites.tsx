import { Head, Link } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SiteFooter from '@/components/SiteFooter';

// Definisikan tipe data untuk produk yang sudah direvisi
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

// Fungsi untuk memformat tanggal
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Komponen kartu produk
const ProductCard = ({ product }: { product: Product }) => (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg h-full">
        <CardHeader className="p-0 relative">
            <div className="aspect-square w-full bg-gray-200">
                {product.photo ? (
                    <img
                        src={`/storage/${product.photo}`}
                        alt={product.nameProduct}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                    </div>
                )}
            </div>
            {product.grade && (
                <Badge className="absolute top-2 right-2 bg-yellow-500 text-white border-none">
                    Grade {product.grade}
                </Badge>
            )}
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
            <CardTitle className="text-lg font-semibold mb-2 text-gray-800">{product.nameProduct}</CardTitle>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                {product.detailProduct || 'No description available.'}
            </p>
            <p className="text-xl font-bold text-gray-900">
                Rp {Number(product.price).toLocaleString('id-ID')}
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
                {/* Info stok dihapus */}
                <span className="font-semibold">{formatDate(product.created_at)}</span>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
            <Link href={route('catalog.show', product.idProduct)} className="w-full">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                    View Details
                </Button>
            </Link>
        </CardFooter>
    </Card>
);

// Halaman Favorit utama
export default function Favorites({ products }: { products: Product[] }) {
    return (
        <>
            <Head title="My Favorites" />
            <div className="min-h-screen bg-gray-100">
                <main className="container mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Favorite Products</h1>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
