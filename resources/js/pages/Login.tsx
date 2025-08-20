
import { Head, useForm } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/login');
    }

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                        <div className="flex justify-center mb-6">
                            <img src="/images/estwo-logo.png" alt="Estwo Logo" className="h-16" />
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-center">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                                <input type="email" id="email" name="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none" placeholder="Email" />
                                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
                                <input type="password" id="password" name="password" value={data.password} onChange={e => setData('password', e.target.value)} className="w-full rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none" placeholder="Password" />
                                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                            </div>
                            <button type="submit" disabled={processing} className="w-full rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600">{processing ? 'Memproses...' : 'Login'}</button>
                        </form>
                        <div className="mt-6 text-center">
                            <span className="text-gray-600">Belum punya akun?</span>
                            <a href="/register" className="ml-2 font-semibold text-yellow-500 hover:text-yellow-600">Daftar di sini</a>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
