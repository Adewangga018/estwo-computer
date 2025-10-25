import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types/global';
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Store, ClipboardCheck, CreditCard, ShieldCheck } from "lucide-react";
import { ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";


// Component untuk menampilkan kartu produk
const ProductCard = ({ product }: { product: Product }) => (
    <Link
        href={route('catalog.show', product.idProduct)}
        className="w-[150px] sm:w-full flex-shrink-0 group block"
    >
        <Card
            className="flex h-full flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
        >
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
            </CardFooter>
        </Card>
    </Link>
);

const steps = [
    {
        icon: <ShoppingBag className="w-10 h-10 text-white" />,
        title: "Pilih Produk",
        desc: "Pilih produk sesuai kebutuhan Anda",
    },
    {
        icon: <MessageCircle className="w-10 h-10 text-white" />,
        title: "Hubungi Admin",
        desc: "Chat dengan admin dan dapatkan jadwal temu",
    },
    {
        icon: <Store className="w-10 h-10 text-white" />,
        title: "Datang ke Toko",
        desc: "Datang sesuai janji temu dengan penjual",
    },
    {
        icon: <ClipboardCheck className="w-10 h-10 text-white" />,
        title: "Cek Barang",
        desc: "Cek kondisi unit dan lakukan tes fungsi di tempat",
    },
    {
        icon: <CreditCard className="w-10 h-10 text-white" />,
        title: "Pembayaran",
        desc: "Lakukan pembayaran dan bawa pulang laptop Anda",
    },
    {
        icon: <ShieldCheck className="w-10 h-10 text-white" />,
        title: "Garansi",
        desc: "Nikmati garansi resmi",
    },
];


export default function Home({ products }: { popularProducts: Product[]; newestProducts: Product[]; products: Product[] }) {
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
                    <section className="mb-4 rounded-lg bg-gradient-to-r from-red-600 to-yellow-500 p-6 py-3 text-white shadow-lg">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-20 w-20 text-yellow-300 drop-shadow-lg">
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
                    {/* SECTION WHY US */}
                    <section className="relative py-16 bg-gradient-to-b from-orange-50 via-white to-yellow-50 overflow-hidden">
                    {/* Bubble background */}
                    <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-orange-300/30 blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-yellow-300/30 blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
                    <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-red-200/30 blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>

                    {/* Heading */}
                    <div className="relative text-center mb-12">
                        <h2 className="text-3xl md:text-6xl font-bold text-gray-800 drop-shadow-sm">
                        Kenapa Harus
                        </h2>
                        <h2 className="text-3xl md:text-6xl font-bold text-orange-600 drop-shadow-sm">
                        Estwo Computer?
                        </h2>
                        <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
                        Kami berkomitmen memberikan pengalaman terbaik untuk pembelian laptop bekas berkualitas tinggi —
                        dengan layanan, performa, dan kepercayaan sebagai prioritas utama.
                        </p>
                    </div>

                    {/* Card Container */}
                    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-16">
                        {[
                        {
                            icon: "💎",
                            title: "Kualitas Terjamin & Bergaransi",
                            desc: "Setiap laptop kami dilindungi garansi hardware hingga 1 tahun dan software seumur hidup. Kami pastikan kualitas bukan sekadar janji - tapi tanggung jawab nyata untuk setiap pelanggan.",
                        },
                        {
                            icon: "💰",
                            title: "Harga Bersahabat, Performa Juara",
                            desc: "Nikmati harga terbaik tanpa kompromi performa! Kamu bisa dapat laptop berkualitas dengan value maksimal, plus promo menarik seperti cashback hingga 10%.",
                        },
                        {
                            icon: "🧰",
                            title: "Layanan Lengkap & Fleksibel",
                            desc: "Mulai dari konsultasi, custom spesifikasi (RAM, SSD, sistem), hingga transaksi yang aman dan mudah — semua kami bantu dengan pelayanan cepat, ramah, dan profesional.",
                        },
                        ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="relative group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Glow Gradient Layer */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-400 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                            {/* Header Card */}
                            <div className="flex items-center justify-center bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white py-3 px-4 rounded-t-2xl shadow-md">
                                <span className="text-2xl mr-2 drop-shadow-sm">{item.icon}</span>
                                <h4 className="font-bold md:text-xl drop-shadow-sm">{item.title}</h4>
                            </div>

                            {/* Body */}
                            <div className="p-5 flex-1">
                                <p className="text-gray-700 text-justify">{item.desc}</p>
                            </div>
                            </div>
                        </motion.div>
                        ))}
                    </div>
                    </section>
                    {/* SECTION SOP PEMESANAN */}
                    <section className="py-12 px-4 md:px-8">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-12">
                        SOP <span className="text-orange-500">Pemesanan</span>
                        </h2>

                        {/* Desktop Layout */}
                        <div className="hidden md:flex items-center justify-between relative">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center relative group w-48 min-h-[320px] mx-2"
                                whileHover={{ scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                            >
                                {/* Nomor step besar */}
                                <div className="flex items-center justify-center mb-3">
                                    <span className="text-4xl font-extrabold text-orange-400 drop-shadow-lg bg-white rounded-full w-14 h-14 flex items-center justify-center border-4 border-orange-200 shadow-md">
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="bg-orange-500 rounded-full p-6 shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center mb-3">
                                    <span className="w-12 h-12 flex items-center justify-center">{step.icon}</span>
                                </div>
                                <h3 className="mt-2 text-xl font-bold text-gray-800 text-center min-h-[48px] flex items-center justify-center">
                                    {step.title}
                                </h3>
                                <p className="text-gray-500 text-base mt-2 max-w-[180px] mx-auto text-center min-h-[48px] flex items-center justify-center">
                                    {step.desc}
                                </p>

                                {/* Panah horizontal antar step */}
                                {index < steps.length - 1 && (
                                    <div className="absolute right-[-40px] top-[45%] w-20 h-[2px] bg-orange-400">
                                        <div className="absolute right-0 top-[-4px] w-0 h-0 border-t-4 border-b-4 border-l-8 border-l-orange-400 border-transparent"></div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                        </div>

                        {/* Mobile Layout (2 kolom zig-zag) */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:hidden relative">
                        {steps.map((step, index) => {
                            const isRight = index % 2 === 1;
                            const isLastRow = index >= steps.length - 2;

                            return (
                                <motion.div
                                    key={index}
                                    className={`flex flex-col items-center text-center relative group ${
                                        isRight ? "justify-self-end" : "justify-self-start"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {/* Nomor step besar */}
                                    <div className="flex items-center justify-center mb-1">
                                        <span className="text-2xl font-extrabold text-orange-400 drop-shadow-lg bg-white rounded-full w-9 h-9 flex items-center justify-center border-4 border-orange-200 shadow-md">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <div className="bg-orange-500 rounded-full p-4 shadow-md group-hover:shadow-lg transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    <h3 className="mt-2 text-sm font-semibold text-gray-800">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs mt-1 max-w-[120px]">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                        </div>

                        <p className="mt-12 text-orange-600 font-semibold text-lg">
                        Garansi Seumur Hidup!
                        </p>
                    </div>
                    </section>
                </main>
            </div>
        </>
    );
}
