import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { useEffect } from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    // Buat form terpisah untuk admin login
    const { data: adminData, setData: setAdminData, post: postAdmin, processing: adminProcessing, errors: adminErrors, reset: resetAdminForm } = useForm({
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/login');
    }

    function handleAdminLogin(e: React.FormEvent) {
        e.preventDefault();
        postAdmin('/admin/login');
    }

    useEffect(() => {
        // Reset error password admin ketika dialog dibuka/ditutup
        return () => {
            resetAdminForm('password');
        };
    }, []);


    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <Card className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                        <CardHeader>
                            <div className="flex justify-center mb-6">
                                <img src="/images/estwo-logo.png" alt="Estwo Logo" className="h-16" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-black text-center">Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                {/* Form login user biasa... (tidak berubah) */}
                                <div className="mb-4 text-black">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                </div>
                                <div className="mb-6 text-black">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                                </div>
                                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" disabled={processing}>
                                    {processing ? 'Memproses...' : 'Login'}
                                </Button>
                            </form>
                            <div className="mt-6 text-center">
                                <span className="text-gray-600">Belum punya akun?</span>
                                <a href="/register" className="ml-2 font-semibold text-yellow-500 hover:text-yellow-600">Daftar di sini</a>
                            </div>
                        </CardContent>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="p-6 pt-0">
                                    <Button variant="outline" className="w-full bg-black text-white">Masuk sebagai admin</Button>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Login Admin</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAdminLogin}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="admin-password" className="text-right">
                                                Password
                                            </Label>
                                            <Input
                                                id="admin-password"
                                                type="password"
                                                value={adminData.password}
                                                onChange={(e) => setAdminData('password', e.target.value)}
                                                className="col-span-3"
                                            />
                                        </div>
                                        {adminErrors.password && <div className="col-start-2 col-span-3 text-red-500 text-sm">{adminErrors.password}</div>}
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" disabled={adminProcessing}>
                                            {adminProcessing ? 'Memproses...' : 'Login'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </main>
            </div>
        </>
    );
}
