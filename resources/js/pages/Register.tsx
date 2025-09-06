import { Head, useForm, Link } from '@inertiajs/react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from '@/components/ui';
import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';

Register.layout = (page: React.ReactNode) => <GuestLayout children={page} />;

export default function Register() {
    // --- PERUBAHAN DI SINI ---
    const { data, setData, post, processing, errors } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-md">
                    {/* Logo Anda tetap di sini */}
                    <div className="mb-6 text-center">

                    </div>
                    <Card>
                        <CardHeader className="text-center">
                            <Link href="/">
                                <img src="/images/estwo-logo.png" alt="Estwo Computer Logo" className="mx-auto h-20 w-auto" />
                            </Link>
                            <CardTitle className="text-2xl">Create an Account</CardTitle>
                            <CardDescription>Enter your details below to register.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit}>

                                <div className="grid gap-4">
                                    {/* --- INPUT NAMA DIPERBARUI DI SINI --- */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                placeholder="Arjuna"
                                                value={data.firstName}
                                                onChange={(e) => setData('firstName', e.target.value)}
                                                required
                                                autoFocus
                                            />
                                            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                placeholder="Dewangga"
                                                value={data.lastName}
                                                onChange={(e) => setData('lastName', e.target.value)}
                                                required
                                            />
                                            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                                        </div>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation}</p>}
                                    </div>
                                    <Button type="submit" className="w-full bg-yellow-500 text-white hover:bg-yellow-600" disabled={processing}>
                                        Create an account
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{' '}
                                <Link href={route('login')} className="underline text-yellow-500 hover:text-yellow-600">
                                    Sign in
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
