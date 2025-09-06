import { usePage, Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';

// Tentukan tipe props agar lebih aman
interface PageProps {
    user: {
        firstName?: string;
        lastName?: string;
        email?: string;
    };
    csrf: string;
    [key: string]: any; // Untuk properti lain yang mungkin ada
}

export default function Account() {
    const { user, csrf } = usePage().props as PageProps;

    // Handler untuk form, meskipun tidak menggunakan Inertia form hook,
    // ini adalah praktik yang baik untuk event handling di React.
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        // Anda bisa menambahkan validasi di sini jika perlu
    };

    return (
        <>
            <Head title="Akun Saya" />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <main className="w-full max-w-lg mx-auto">
                    <Card className="shadow-2xl rounded-xl">
                        <CardHeader className="text-center">
                            <Link href="/" className="inline-block mb-4">
                                <img src="/images/estwo-logo.png" alt="Estwo Logo" className="h-20 mx-auto" />
                            </Link>
                            <CardTitle className="text-3xl font-bold">Akun Saya</CardTitle>
                            <CardDescription>Perbarui informasi profil Anda di bawah ini.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 md:px-8">
                            {/* Form Edit Profil */}
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-sm text-gray-500">Nama Depan</Label>
                                        <p className="font-semibold text-lg">{user?.firstName || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-sm text-gray-500">Nama Belakang</Label>
                                        <p className="font-semibold text-lg">{user?.lastName || '-'}</p>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm text-gray-500">Email</Label>
                                    <p className="font-semibold text-lg">{user?.email || '-'}</p>
                                </div>
                            </div>

                            {/* Tombol Aksi Lainnya */}
                            <div className="mt-6 space-y-3">
                                <form method="POST" action="/logout">
                                    <input type="hidden" name="_token" value={csrf} />
                                    <Button type="submit" variant="outline" className="w-full bg-yellow-500 hover:bg-yellow-600 hover:text white text-white font-bold py-3">
                                        Logout
                                    </Button>
                                </form>
                                <form method="POST" action="/account/delete" onSubmit={(e) => !confirm('Apakah Anda yakin ingin menghapus akun ini secara permanen?') && e.preventDefault()}>
                                    <input type="hidden" name="_token" value={csrf} />
                                    <Button type="submit" variant="destructive" className="w-full font-semibold">
                                        Hapus Akun
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </>
    );
}
