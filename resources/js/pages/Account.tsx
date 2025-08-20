
import { usePage, Head } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';

export default function Account() {
    const { user, csrf } = usePage().props as any;
    return (
        <>
            <Head title="Akun Saya" />
            <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
                <SiteHeader />
                <main className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                        <div className="flex justify-center mb-6">
                            <img src="/images/estwo-logo.png" alt="Estwo Logo" className="h-16" />
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-center">Akun Saya</h2>
                        <form method="POST" action="/account/edit" className="space-y-4">
                            <input type="hidden" name="_token" value={csrf} />
                            <div className="font-semibold">Nama Depan:
                                <input type="text" name="firstName" defaultValue={user?.firstName ?? ''} className="w-full rounded-lg border border-gray-300 p-2 mt-1" />
                            </div>
                            <div className="font-semibold">Nama Belakang:
                                <input type="text" name="lastName" defaultValue={user?.lastName ?? ''} className="w-full rounded-lg border border-gray-300 p-2 mt-1" />
                            </div>
                            <div className="font-semibold">Email:
                                <input type="email" name="email" defaultValue={user?.email ?? ''} className="w-full rounded-lg border border-gray-300 p-2 mt-1" />
                            </div>
                            <div className="font-semibold">Password Baru:
                                <input type="password" name="password" className="w-full rounded-lg border border-gray-300 p-2 mt-1" placeholder="Kosongkan jika tidak ingin mengubah" />
                            </div>
                            <button type="submit" className="w-full rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-white hover:bg-yellow-600">Simpan Perubahan</button>
                        </form>
                        <form method="POST" action="/account/delete" className="mt-2">
                            <input type="hidden" name="_token" value={csrf} />
                            <button type="submit" className="w-full rounded-lg bg-red-500 px-6 py-2 font-semibold text-white hover:bg-red-600">Hapus Akun</button>
                        </form>
                        <form method="POST" action="/logout" className="mt-2">
                            <input type="hidden" name="_token" value={csrf} />
                            <button type="submit" className="w-full rounded-lg bg-black px-6 py-2 font-semibold text-white hover:bg-gray-800">Logout</button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
