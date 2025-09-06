import { Head, router, usePage } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Definisikan tipe data lengkap untuk satu produk
interface Product {
    idProduct: number;
    nameProduct: string;
    typeProduct: string | null;
    detailProduct: string | null;
    brandProduct: string | null;
    price: number;
    grade: string | null;
    completenessProduct: string | null;
    specs: string | null;
    disability: string | null;
    linkProduct: string | null; // Kolom baru
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

export default function ProductDetail({ product, isFavorited }: { product: Product, isFavorited: boolean }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const [favorited, setFavorited] = useState(isFavorited);
    const [showVideoModal, setShowVideoModal] = useState(false); // State untuk modal video

    const sellerWhatsAppNumber = '6285194574812'; // Nomor WhatsApp penjual di Surabaya, Jawa Timur
    const whatsappMessage = `Halo, saya tertarik dengan produk "${product.nameProduct}" yang ada di website Anda. Apakah masih tersedia? Saya dari Surabaya, Jawa Timur.`;
    const whatsappUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    const handleFavoriteToggle = () => {
        if (!user) {
            router.get('/login');
            return;
        }
        router.post(route('favorites.toggle', product.idProduct), {}, {
            preserveScroll: true,
            onSuccess: () => setFavorited(!favorited),
        });
    };

    // Fungsi untuk mendapatkan URL embed dari berbagai platform
    const getEmbedUrl = (url: string | null): string | null => {
        if (!url) return null;

        // YouTube
        const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const youtubeMatch = url.match(youtubeRegExp);
        if (youtubeMatch && youtubeMatch[2].length === 11) {
            return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
        }

        // TikTok (hanya bisa dengan URL embed resmi jika tersedia, atau mengarah ke TikTok)
        // Catatan: TikTok embed lebih kompleks dan sering membutuhkan JS SDK mereka
        if (url.includes('tiktok.com')) {
            // Ini adalah pendekatan paling sederhana, langsung ke URL aslinya atau cari embed code
            // Untuk embed yang benar, biasanya butuh embed code dari TikTok langsung
            // Contoh URL embed yang mungkin berhasil (tidak dijamin 100%):
            // return `https://www.tiktok.com/embed/v2/${matchId}?embed_type=iframe`
            // Untuk POC, kita bisa arahkan ke URL TikTok aslinya
            return url; // Mengarahkan ke link TikTok langsung atau bisa diubah menjadi embed jika formatnya diketahui
        }

        // Instagram (butuh embed code dari Instagram atau URL oEmbed)
        // Mirip dengan TikTok, Instagram memiliki batasan embed.
        // Untuk POC, kita bisa arahkan ke URL Instagram aslinya
        if (url.includes('instagram.com/reel/') || url.includes('instagram.com/p/')) {
            // Ini biasanya membutuhkan endpoint oEmbed atau embed code dari Instagram.
            // Sebagai alternatif, kita bisa arahkan ke URL postingan Instagram itu sendiri
            return url + '/embed'; // Ini mungkin bekerja untuk beberapa kasus embed Instagram
        }

        // Asumsi link lain mungkin bisa di-embed langsung jika formatnya pas (misal iframe langsung)
        return url;
    };

    const videoEmbedUrl = getEmbedUrl(product.linkProduct);

    return (
        <>
            <Head title={product.nameProduct} />
            <div className="min-h-screen bg-gray-50">
                <main className="container mx-auto py-12 px-4 bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start">
                            <h2 className="text-3xl font-bold mb-4 border-b pb-3 flex-grow">Product Detail</h2>
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
                                    <DetailRow label="Grade" value={product.grade} />
                                    <DetailRow label="Completeness" value={product.completenessProduct} />
                                </dl>
                                <div className="mt-6 flex flex-col sm:flex-row gap-4"> {/* Menggunakan flex-row untuk tombol */}
                                     <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                        <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                                            Hubungi Penjual
                                        </Button>
                                     </a>
                                     {product.linkProduct && ( // Tampilkan tombol video hanya jika ada link
                                        <Button
                                            size="lg"
                                            onClick={() => setShowVideoModal(true)}
                                        >
                                            Video Produk
                                        </Button>
                                     )}
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
                            {/* Bagian video langsung dihapus dari sini */}
                        </div>
                        <div className="flex justify-end mt-6">
                            <a href="/catalog">
                                <Button className="bg-gray-200 hover:bg-gray-300" variant="outline">Close</Button>
                            </a>
                        </div>
                    </div>
                </main>

                {/* Video Modal */}
                {showVideoModal && videoEmbedUrl && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 w-full max-w-3xl aspect-video relative">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowVideoModal(false)}
                                className="absolute top-2 right-2 text-gray-700 hover:bg-gray-200"
                                aria-label="Close video"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                            <iframe
                                src={videoEmbedUrl}
                                title={`${product.nameProduct} Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" // Tambahkan web-share
                                allowFullScreen
                                className="w-full h-full rounded-lg"
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
