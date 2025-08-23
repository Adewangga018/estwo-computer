import { Head, router, usePage } from '@inertiajs/react'; // 1. Impor router dan usePage
import SiteHeader from '@/components/SiteHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useState } from 'react'; // 2. Impor useState
import { cn } from '@/lib/utils'; // 3. Impor cn untuk styling kondisional

// Definisikan tipe data lengkap untuk satu produk
interface Product {
    idProduct: number;
    nameProduct: string;
    typeProduct: string | null;
    detailProduct: string | null;
    stockProduct: number;
    brandProduct: string | null;
    price: number;
    grade: string | null;
    completenessProduct: string | null;
    specs: string | null;
    disability: string | null;
    photo: string | null;
    created_at: string;
    updated_at: string;
}

// Komponen untuk menampilkan baris detail
const DetailRow = ({ label, value }: { label: string; value: string | number | null }) => (
    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b last:border-b-0">
        <dt className="text-sm font-medium leading-6 text-gray-600">{label}</dt>
        <dd className="mt-1 text-sm leading-6 text-gray-800 sm:col-span-2 sm:mt-0">{value || '-'}</dd>
    </div>
);

// Terima prop 'isFavorited' dari controller
export default function ProductDetail({ product, isFavorited }: { product: Product, isFavorited: boolean }) {
    const { props } = usePage();
    const user = props.auth?.user;

    // 4. Gunakan state untuk memberi feedback visual instan
    const [favorited, setFavorited] = useState(isFavorited);

    const sellerWhatsAppNumber = '6285194574812';
    const whatsappMessage = `Halo, saya tertarik dengan produk "${product.nameProduct}". Apakah masih tersedia?`;
    const whatsappUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // 5. Fungsi untuk menambah/menghapus favorit
    const handleFavoriteToggle = () => {
        // Jika user belum login, arahkan ke halaman login
        if (!user) {
            router.get('/login');
            return;
        }

        // Kirim request ke server
        router.post(route('favorites.toggle', product.idProduct), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Update state lokal setelah request berhasil
                setFavorited(!favorited);
            }
        });
    };

    return (
        <>
            <Head title={product.nameProduct} />
            <div className="min-h-screen bg-gray-50">
                <SiteHeader />
                <main className="container mx-auto py-12 px-4 bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="bg-white shadow-xl  rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto ">
                        <div className="flex justify-between items-start">
                            <h2 className="text-3xl font-bold mb-4 border-b pb-3 flex-grow">Product Detail</h2>
                            {/* 6. Buat tombol fungsional */}
                            <Button onClick={handleFavoriteToggle} variant="ghost" size="icon" className="ml-4" aria-label="Toggle Favorite">
                                <Heart className={cn("h-6 w-6 transition-colors", favorited ? "text-red-500 fill-current" : "text-gray-400")} />
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                {product.photo ?
                                    <img src={`/storage/${product.photo}`} alt={product.nameProduct} className="w-full h-auto object-cover rounded-lg shadow-md aspect-square" /> :
                                    <div className="w-full h-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">No Photo</div>
                                }
                            </div>
                            <div className="md:w-2/3">
                                <dl className="text-sm">
                                    <DetailRow label="Product ID" value={product.idProduct} />
                                    <DetailRow label="Product Name" value={product.nameProduct} />
                                    <DetailRow label="Brand" value={product.brandProduct} />
                                    <DetailRow label="Type" value={product.typeProduct} />
                                    <DetailRow label="Price" value={`Rp ${Number(product.price).toLocaleString('id-ID')}`} />
                                    <DetailRow label="Stock" value={product.stockProduct} />
                                    <DetailRow label="Grade" value={product.grade} />
                                    <DetailRow label="Completeness" value={product.completenessProduct} />
                                </dl>
                                <div className="mt-6">
                                     <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                                        <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" disabled={product.stockProduct === 0}>
                                            {product.stockProduct > 0 ? 'Hubungi Penjual' : 'Stok Habis'}
                                        </Button>
                                     </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg mb-1">Description</h3>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{product.detailProduct || '-'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg mb-1">Specifications</h3>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{product.specs || '-'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg mb-1">Disability/Minus</h3>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{product.disability || '-'}</p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <a href="/catalog">
                                <Button className="bg-gray-200 hover:bg-gray-300"variant="outline">Close</Button>
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
