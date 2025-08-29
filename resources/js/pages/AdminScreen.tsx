import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react'; // Impor ikon panah

export default function AdminScreen() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="relative flex min-h-screen items-center justify-center bg-gray-100 p-4">
                {/* Tombol Kembali */}
                <Link href="/login" className="absolute top-4 left-4">
                    <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Kembali ke Login
                    </Button>
                </Link>

                <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
                    <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Link href="/sipak/users" className="block rounded-lg bg-yellow-500 p-6 text-center text-white shadow-md transition-transform hover:scale-105">
                            <h2 className="text-2xl font-semibold">Users Monitoring</h2>
                        </Link>
                        <Link href="/sipak/products" className="block rounded-lg bg-yellow-500 p-6 text-center text-white shadow-md transition-transform hover:scale-105">
                            <h2 className="text-2xl font-semibold">Products Monitoring</h2>
                        </Link>
                        <Link href="/sipak/reports" className="block rounded-lg bg-yellow-500 p-6 text-center text-white shadow-md transition-transform hover:scale-105">
                            <h2 className="text-2xl font-semibold">Reports</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
