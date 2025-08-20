import { Head, useForm } from '@inertiajs/react';
import SiteHeader from '@/components/SiteHeader';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/register');
    }

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                        <div className="flex justify-center mb-6">
                            <img src="/images/estwo-logo.png" alt="Estwo Logo" className="h-16" />
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-center">Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block mb-2 font-semibold">First Name</label>
                                <input type="text" id="firstName" name="firstName" value={data.firstName} onChange={e => setData('firstName', e.target.value)} className="w-full rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none" placeholder="First Name" />
                                {errors.firstName && <div className="text-red-500 text-sm mt-1">{errors.firstName}</div>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block mb-2 font-semibold">Last Name</label>
                                <input type="text" id="lastName" name="lastName" value={data.lastName} onChange={e => setData('lastName', e.target.value)} className="w-full rounded-lg border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none" placeholder="Last Name" />
                                {errors.lastName && <div className="text-red-500 text-sm mt-1">{errors.lastName}</div>}
                            </div>
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
                            <button type="submit" disabled={processing} className="w-full rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600">{processing ? 'Mendaftar...' : 'Register'}</button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
