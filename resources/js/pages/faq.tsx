// resources/js/pages/FAQ.tsx

// import MainLayout from '@/Layouts/MainLayout';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Head } from '@inertiajs/react';

// Daftar pertanyaan dan jawaban FAQ EstwoComputer
const faqGroups = [
    {
        title: '🖥️ Umum & Produk',
        items: [
            {
                question: 'Q1: Apakah Estwo Computer menjual laptop baru atau bekas?',
                answer:
                    'Kami menjual laptop baru dan second (bekas). Semua laptop second dicek kondisi hardware & software, sudah teruji, dan siap pakai.',
            },
            {
                question: 'Q2: Bagaimana cara mengetahui kondisi laptop second?',
                answer:
                    'Setiap produk second kami sertakan detail spesifikasi, foto real produk, serta deskripsi kondisi. Jika ada minus (misalnya baterai atau casing), akan dijelaskan dengan jujur.',
            },
            {
                question: 'Q3: Apakah bisa request spesifikasi khusus?',
                answer:
                    'Bisa. Anda dapat request upgrade RAM, SSD, atau Windows sesuai kebutuhan. Tim kami akan bantu menghitung biaya tambahannya.',
            },
            {
                question: 'Q4: Apakah ada garansi untuk produk second?',
                answer:
                    'Ya, setiap produk second tetap mendapatkan garansi toko sesuai syarat & ketentuan (biasanya 1–3 bulan, tergantung produk).',
            },
        ],
    },
    {
        title: '🛒 Pemesanan & Pembayaran',
        items: [
            {
                question: 'Q5: Bagaimana cara memesan produk di EstwoComputer?',
                answer: (
                    <div>
                        Ada 3 cara:
                        <ul className="list-disc pl-5 mt-2">
                            <li>Langsung ke toko kami.</li>
                            <li>Melalui WhatsApp Business.</li>
                            <li>Melalui website resmi Estwo Computer.</li>
                        </ul>
                    </div>
                ),
            },
            {
                question: 'Q6: Metode pembayaran apa saja yang tersedia?',
                answer: (
                    <div>
                        <ul className="list-disc pl-5 mt-2">
                            <li>Transfer bank (BCA, Mandiri, BNI, BRI, dll)</li>
                            <li>E-wallet (OVO, Dana, GoPay, ShopeePay)</li>
                            <li>COD (khusus area tertentu, syarat & ketentuan berlaku)</li>
                        </ul>
                    </div>
                ),
            },
            {
                question: 'Q7: Apakah bisa cicilan / kredit?',
                answer:
                    'Bisa. Kami bekerja sama dengan marketplace yang menyediakan cicilan.',
            },
        ],
    },
    {
        title: '🚚 Pengiriman, Garansi & Service',
        items: [
            {
                question: 'Q8: Apakah bisa kirim ke luar kota?',
                answer:
                    'Bisa, kami melayani pengiriman ke tempat tertentu sesuai kesepakatan',
            },
            {
                question: 'Q9: Bagaimana jika barang rusak saat pengiriman?',
                answer: (
                    <div>
                        <ol className="list-decimal pl-5 mt-2">
                            <li>Pastikan Anda melakukan unboxing dengan video.</li>
                            <li>Laporkan ke kami dalam 1x24 jam dengan bukti foto/video.</li>
                            <li>Tim kami akan bantu klaim sesuai ketentuan.</li>
                        </ol>
                    </div>
                ),
            },
            {
                question: 'Q10: Apa syarat utama untuk klaim garansi toko?',
                answer: (
                    <div>
                        <ol className="list-decimal pl-5 mt-2">
                            <li>Wajib memberikan review Google bintang 5 untuk EstwoComputer.</li>
                            <li>Produk masih dalam masa garansi.</li>
                            <li>Kerusakan bukan karena kelalaian pengguna (jatuh, kena air, modifikasi ilegal).</li>
                        </ol>
                    </div>
                ),
            },
            {
                question: 'Q11: Apakah ada layanan service laptop di Estwo Computer?',
                answer: (
                    <div>
                        Kami melayani:
                        <ul className="list-disc pl-5 mt-2">
                            <li>Perbaikan hardware (keyboard, layar, baterai, motherboard, dll).</li>
                            <li>Upgrade RAM, SSD, HDD.</li>
                            <li>Instalasi software & sistem operasi.</li>
                            <li>Maintenance berkala.</li>
                        </ul>
                    </div>
                ),
            },
            {
                question: 'Q12: Bagaimana prosedur klaim garansi di Estwo Computer?',
                answer: (
                    <div>
                        <ol className="list-decimal pl-5 mt-2">
                            <li>Hubungi admin Estwo Computer untuk konfirmasi awal.</li>
                            <li>Isi formulir klaim garansi di website (lengkapi data pembelian, nomor seri produk, dan bukti review Google ⭐⭐⭐⭐⭐).</li>
                            <li>Produk dibawa/dikirim ke toko untuk pemeriksaan.</li>
                            <li>Tim teknisi akan melakukan pengecekan sesuai ketentuan garansi.</li>
                            <li>Jika disetujui, garansi diproses dalam bentuk perbaikan atau penggantian unit sesuai kondisi.</li>
                        </ol>
                    </div>
                ),
            },
        ],
    },
];

export default function FAQ() {
    return (
        <>
            <Head title="FAQ" />
            <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Frequently Asked Questions (FAQ)
                    </h1>
                </div>

                <div className="mt-10 flex flex-col gap-8">
                    {faqGroups.map((group, groupIdx) => (
                        <div key={groupIdx}>
                            <h2 className="text-xl font-bold mb-4">{group.title}</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {group.items.map((item, idx) => (
                                    <AccordionItem value={`group-${groupIdx}-item-${idx}`} key={idx}>
                                        <AccordionTrigger className="text-left font-semibold">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-base text-gray-700">
                                            {item.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// Terapkan layout MainLayout via properti agar tidak dobel
import MainLayout from '@/Layouts/MainLayout';
// @ts-ignore
FAQ.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
