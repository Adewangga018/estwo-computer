import { usePage, Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PageProps as InertiaPageProps } from '@/types/global';

// Definisikan tipe data untuk user yang diterima dari AccountController
// Ini lebih spesifik daripada tipe User global Anda
type AccountUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

// Gabungkan tipe PageProps global dari Inertia dengan props khusus halaman ini
type AccountPageProps = InertiaPageProps & {
    user: AccountUser;
};

export default function Account() {
    // Beri tahu hook usePage tipe spesifik yang harus digunakan
    // Ini akan menghilangkan error dan tidak perlu "as" lagi
    const { user } = usePage<AccountPageProps>().props;

    return (
        <>
            <Head title="Akun Saya" />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <main className="w-full max-w-lg mx-auto">
                    <Card className="shadow-2xl rounded-xl">
                        <CardHeader className="text-center">
                            <Link href="/" className="inline-block mb-1 mt-4">
                                <img src="/images/estwo-logo.png" alt="Estwo Logo" className="h-20 mx-auto" />
                            </Link>
                            <CardTitle className="text-3xl font-bold">Akun Saya</CardTitle>
                            <CardDescription>Informasi profil Anda.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-6 md:px-8 pb-8">
                            {/* Informasi Profil */}
                            <div className="space-y-4 mb-8">
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
                                <Link href="/logout" method="post" as="button" className="w-full">
                                    <Button variant="outline" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3">
                                        Logout
                                    </Button>
                                </Link>
                                <Link
                                    href="/account/delete"
                                    method="post"
                                    as="button"
                                    className="w-full"
                                    onBefore={() => confirm('Apakah Anda yakin ingin menghapus akun ini secara permanen?')}
                                >
                                    <Button variant="destructive" className="w-full font-semibold">
                                        Hapus Akun
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </>
    );
}
