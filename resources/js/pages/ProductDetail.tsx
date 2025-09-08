import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';
import { useState } from 'react';
import { cn, formatCurrency } from '@/lib/utils';
import { PageProps } from '@/types/global';

// Definisikan tipe data lengkap untuk satu produk
interface Product {
    idProduct: number;
    nameProduct: string;
    typeProduct: string | null;
    detailProduct: string | null;
    brandProduct: string | null;
    price: number;
    isDiscount: boolean; // <-- Ditambahkan
    discountPercentage: number | null; // <-- Ditambahkan
    priceDiscount: number | null; // <-- Ditambahkan
    grade: string | null;
    completenessProduct: string | null;
    specs: string | null;
    disability: string | null;
    linkProduct: string | null;
    photo: string | null;
    created_at: string;
    updated_at: string;
}

export default function ProductDetail({ product, isFavorited }: { product: Product, isFavorited: boolean }) {
    const { props } = usePage<PageProps>();
    const user = props.auth?.user;
    const [favorited, setFavorited] = useState(isFavorited);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const sellerWhatsAppNumber = '6285194574812';
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

    const getEmbedUrl = (url: string | null): string | null => {
        if (!url) return null;
        const youtubeRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const youtubeMatch = url.match(youtubeRegExp);
        if (youtubeMatch && youtubeMatch[2].length === 11) {
            return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
        }
        if (url.includes('instagram.com/reel/') || url.includes('instagram.com/p/')) {
            return url + '/embed';
        }
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
                            <div className="md:w-1/3 relative">
                                {product.photo ?
                                    <img src={`/storage/${product.photo}`} alt={product.nameProduct} className="w-full h-auto object-cover rounded-lg shadow-md aspect-square" /> :
                                    <div className="w-full h-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">No Photo</div>
                                }
                                {product.grade && (
                                    <div className="absolute top-2 right-2">
                                        <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                                            Grade {product.grade}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="md:w-2/3">
                                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                    {product.linkProduct && (
                                        <Button
                                            size="lg"
                                            onClick={() => setShowVideoModal(true)}
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                                        >
                                            Video Produk
                                        </Button>
                                    )}
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                                        <Button size="lg" className="w-full">
                                            Hubungi Penjual
                                        </Button>
                                    </a>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.nameProduct}</h3>
                                    {product.isDiscount && product.priceDiscount !== null ? (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-lg text-red-600 line-through">
                                                    {formatCurrency(product.price)}
                                                </span>
                                                {product.discountPercentage && (
                                                    <span className="me-2 rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                        {product.discountPercentage}% OFF
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-4xl font-extrabold text-gray-900">
                                                {formatCurrency(product.priceDiscount)}
                                            </p>
                                        </div>
                                    ) : (
                                        <p className="text-4xl font-extrabold text-gray-900">
                                            {formatCurrency(product.price)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4 text-sm">
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg mb-1">Brand</h3>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{product.brandProduct || '-'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg mb-1">Type</h3>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{product.typeProduct || '-'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-700 text-lg mb-1">Completeness</h3>
                                <p className="text-gray-800 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{product.completenessProduct || '-'}</p>
                            </div>
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
                                <Button className="bg-gray-200 hover:bg-gray-300" variant="outline">Close</Button>
                            </a>
                        </div>
                    </div>
                </main>

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
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
