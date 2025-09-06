import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GuestLayout from '@/Layouts/GuestLayout';
import React from 'react';

AdminScreen.layout = (page: React.ReactNode) => <GuestLayout children={page} />;

export default function AdminScreen() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="container mx-auto flex h-screen items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl">Admin Menu</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-4 p-6">
                        <Link href={route('admin.products.index')}>
                            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" size="lg">
                                Products Monitoring
                            </Button>
                        </Link>
                         <Link href="/">
                            <Button className="w-full" size="lg" variant="outline">
                                Back to Home
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
