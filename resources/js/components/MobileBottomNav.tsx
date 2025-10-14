import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from "framer-motion";
import { Home, LayoutGrid, Star, Heart, User, Wrench, HelpCircle, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

export default function MobileBottomNav() {
    const { url, props } = usePage();
    const auth = (props as any).auth;

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const [isServiceOpen, setIsServiceOpen] = useState(false); // state drop-up service

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/catalog', label: 'Catalog', icon: LayoutGrid },
    ];

    return (
        <>
            <div className="sm:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
                <div className="grid h-full grid-cols-5 mx-auto font-medium relative">

                    {/* Tombol navigasi utama */}
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
                                    url === item.href ? 'text-yellow-800' : 'text-gray-500'
                                }`}
                            >
                                <Icon className={`w-6 h-6 mb-1 ${
                                    url === item.href ? 'text-yellow-800' : 'text-gray-500 group-hover:text-yellow-600'
                                }`} />
                                <span className="text-sm group-hover:text-yellow-600">{item.label}</span>
                            </Link>
                        );
                    })}

                    {/* Tombol Service dengan drop-up */}
                    <div className="relative">
                        <button
                            onClick={() => setIsServiceOpen(!isServiceOpen)}
                            className="inline-flex flex-col items-center justify-center w-full px-5 text-gray-500 hover:bg-gray-50 group focus:outline-none"
                        >
                            <Wrench className="w-6 h-6 mb-1 mt-2 text-gray-500 group-hover:text-yellow-600" />
                            <span className="text-sm group-hover:text-yellow-600">Service</span>
                        </button>

                        {/* Drop-up menu */}
                        <AnimatePresence>
                            {isServiceOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-white border shadow-lg rounded-xl p-2 flex flex-col gap-2 w-40 z-50"
                                >
                                    {/* Warranty */}
                                    <a
                                        href="https://docs.google.com/forms/d/e/1FAIpQLSeRDklJV6ambiGI1PGMr4wyWonFNvIney-R_TxzRFFJQC8x6Q/viewform"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 text-sm p-2 rounded-md hover:bg-gray-50"
                                    >
                                        <ClipboardCheck size={16} />
                                        Warranty
                                    </a>

                                    {/* FAQ */}
                                    <Link
                                        href="/faq"
                                        className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 text-sm p-2 rounded-md hover:bg-gray-50"
                                    >
                                        <HelpCircle size={16} />
                                        FAQ
                                    </Link>

                                    {/* Review */}
                                    <Link
                                        href="/review"
                                        className="flex items-center gap-2 text-gray-700 hover:text-yellow-600 text-sm p-2 rounded-md hover:bg-gray-50"
                                    >
                                        <Star size={16} />
                                        Review
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Favorite */}
                    {auth.user ? (
                        <Link
                            href="/favorites"
                            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
                                url === '/favorites' ? 'text-yellow-800' : 'text-gray-500'
                            }`}
                        >
                            <Heart className={`w-6 h-6 mb-1 ${
                                url === '/favorites' ? 'text-yellow-800' : 'text-gray-500 group-hover:text-yellow-600'
                            }`} />
                            <span className="text-sm group-hover:text-yellow-600">Favorite</span>
                        </Link>
                    ) : (
                        <button
                            onClick={() => setIsAuthDialogOpen(true)}
                            className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 group"
                        >
                            <Heart className="w-6 h-6 mb-1 text-gray-500 group-hover:text-yellow-600" />
                            <span className="text-sm group-hover:text-yellow-600">Favorite</span>
                        </button>
                    )}

                    {/* Account */}
                    {auth.user ? (
                        <Link
                            href="/account"
                            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group ${
                                url === '/account' ? 'text-yellow-800' : 'text-gray-500'
                            }`}
                        >
                            <User className={`w-6 h-6 mb-1 ${
                                url === '/account' ? 'text-yellow-800' : 'text-gray-500 group-hover:text-yellow-600'
                            }`} />
                            <span className="text-sm group-hover:text-yellow-600">Account</span>
                        </Link>
                    ) : (
                        <button
                            onClick={() => setIsAuthDialogOpen(true)}
                            className="inline-flex flex-col items-center justify-center px-5 text-gray-500 hover:bg-gray-50 group"
                        >
                            <User className="w-6 h-6 mb-1 text-gray-500 group-hover:text-yellow-600" />
                            <span className="text-sm group-hover:text-yellow-600">Account</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Dialog login/daftar */}
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-yellow-500">Akses Terbatas</DialogTitle>
                        <DialogDescription>
                            Anda perlu masuk ke akun Anda untuk mengakses fitur ini. Silakan masuk atau daftar jika Anda belum punya akun.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline" asChild className="bg-gray-800 text-white">
                            <Link href="/register">Daftar</Link>
                        </Button>
                        <Button asChild className="bg-yellow-500 hover:bg-yellow-600">
                            <Link href="/login">Masuk</Link>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
