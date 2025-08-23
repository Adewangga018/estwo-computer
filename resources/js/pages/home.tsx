import { Head, Link } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SiteFooter from '@/components/SiteFooter';


// Definisikan tipe data untuk produk agar sesuai dengan data dari katalog
interface Product {
    idProduct: number;
    nameProduct: string;
    price: number;
    stockProduct: number;
    photo: string | null;
    grade: string | null;
    detailProduct: string | null; // Ditambahkan
    created_at: string; // Ditambahkan
}

// Fungsi untuk memformat tanggal
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Komponen kartu produk yang bisa digunakan kembali
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
            {/* Menambahkan deskripsi produk dengan pemotongan teks */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
                {product.detailProduct || 'No description available.'}
            </p>
            <p className="text-xl font-bold text-gray-900">
                Rp {Number(product.price).toLocaleString('id-ID')}
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Stock: {product.stockProduct > 0 ? product.stockProduct : 'Habis'}</span>
                {/* Menambahkan tanggal rilis */}
                <span className="font-semibold">{formatDate(product.created_at)}</span>
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
            <Link href={route('catalog.show', product.idProduct)} className="w-full">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" disabled={product.stockProduct === 0}>
                    {product.stockProduct > 0 ? 'View Details' : 'Not Available'}
                </Button>
            </Link>
        </CardFooter>
    </Card>
);

// Terima props dari HomeController
export default function Home({ popularProducts, newestProducts }: { popularProducts: Product[], newestProducts: Product[] }) {
    return (
        <>
            <Head title="Home" />
            <div className="bg-gray-100 text-gray-800">
                <SiteHeader />
                <main className="container mx-auto p-4">
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
                            <Link href="/catalog">
                                <Button className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-white hover:bg-yellow-600">
                                    Lebih Lanjut
                                </Button>
                            </Link>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <section className="rounded-lg bg-white p-6 shadow-lg">
                            <h3 className="mb-4 text-2xl font-bold">PRODUK POPULER</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {popularProducts.length > 0 ? (
                                    popularProducts.map(product => <ProductCard key={product.idProduct} product={product} />)
                                ) : (
                                    <p className="col-span-2 text-gray-500">Produk populer belum tersedia.</p>
                                )}
                            </div>
                        </section>

                        <section className="rounded-lg bg-white p-6 shadow-lg">
                            <h3 className="mb-4 text-2xl font-bold">PRODUK TERBARU</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {newestProducts.length > 0 ? (
                                    newestProducts.map(product => <ProductCard key={product.idProduct} product={product} />)
                                ) : (
                                    <p className="col-span-2 text-gray-500">Produk terbaru belum tersedia.</p>
                                )}
                            </div>
                        </section>
                    </div>
                </main>
                <SiteFooter />
            </div>
        </>
    );
}
