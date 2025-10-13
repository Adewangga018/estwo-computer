import { Instagram, Phone, MapPin } from 'lucide-react';
import { TikTokIcon } from './ui/icon';
import { Link } from '@inertiajs/react';

export default function SiteFooter() {
    return (
        <footer className="bg-black text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Kolom 1: Logo dan Deskripsi */}
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-2">
                            <img src="/images/estwo-logo.png" alt="Estwo Computer Logo" className="h-12 w-auto" />
                            <h2 className="ml-4 text-3xl font-bold">ESTWO COMPUTER</h2>
                        </div>
                        <p className="text-gray-400 text-justify">
                            Spesialis laptop bekas berkualitas dengan garansi terpercaya. Kami menyediakan pilihan terbaik untuk kebutuhan mahasiswa dan profesional dengan harga yang terjangkau.
                        </p>
                    </div>

                    {/* Kolom 2: Kontak dan Alamat */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Hubungi Kami</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center">
                                <MapPin size={20} className="mr-3" />
                                <a href="https://maps.app.goo.gl/mg5j1rigUcsitfm36" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                                    Jl. Wisma Permai 1 No.66 Mulyosari
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="mr-3" />
                                <a href="https://wa.me/6285194574812" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500">
                                    +62 851-9457-4812
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 3: Media Sosial */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Tautan Cepat</h3>
                        <ul className="flex flex-row text-gray-400 space-x-8 mb-2"> {/* Menambah margin bawah */}
                            <li>
                                <a
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSeRDklJV6ambiGI1PGMr4wyWonFNvIney-R_TxzRFFJQC8x6Q/viewform"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-yellow-600"
                                >
                                    Service
                                </a>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-yellow-600">
                                    FAQ
                                </Link>
                            </li>
                        </ul>

                        {/* Media sosial dipindah ke sini */}
                        <h3 className="text-xl font-semibold mb-2">Ikuti Kami</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/estwocomputer.id?igsh=MXV2NnNwYTJrbDZmcg==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500">
                                <Instagram size={28} />
                            </a>
                            <a href="https://www.tiktok.com/@estwocomputer.id?_t=ZS-8z59O8idMFE&_r=1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500">
                                <TikTokIcon className="h-7 w-7" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Estwo Computer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
