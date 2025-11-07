import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import React from 'react';

interface DashboardProps {
    embedUrl: string;
}

DashboardMonitoring.layout = (page: React.ReactNode) => <GuestLayout children={page} />;

export default function DashboardMonitoring({ embedUrl }: DashboardProps) {
    return (
        <>
            <Head title="Power BI Monitoring" />
            
            <div style={{ minHeight: '100vh', width: '100%' }} className="flex flex-col">
                <header className="p-4 bg-gray-800 text-white shadow-lg flex justify-between items-center">
                    <h1 className="text-xl font-bold">Power BI Dashboard Monitoring</h1>
                    <Link href={route('admin.dashboard')}>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition duration-150">
                            Kembali ke Menu
                        </button>
                    </Link>
                </header>

                {/* Main Content: flex-grow agar mengambil sisa tinggi yang tersedia */}
                <main className="flex-grow p-4 bg-gray-100 flex justify-center items-center"> {/* Tambahkan justify-center items-center */}
                    {embedUrl ? (
                        // Rasio Aspek 16:9 Wrapper
                        // w-full untuk lebar penuh, relative untuk posisi absolut iframe,
                        // pb-[56.25%] untuk tinggi (9/16 * 100 = 56.25)
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> 
                            <iframe
                                src={embedUrl}
                                title="Power BI Dashboard"
                                // iframe: posisi absolut untuk mengisi wrapper ratio, w-full h-full
                                className="absolute top-0 left-0 w-full h-full border-0 rounded-lg shadow-xl"
                                allowFullScreen={true}
                            ></iframe>
                        </div>
                    ) : (
                        <div className="text-center p-10 bg-white rounded-lg shadow-md">
                            <p className="text-lg text-red-500">Error: URL Power BI Embed tidak ditemukan.</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
