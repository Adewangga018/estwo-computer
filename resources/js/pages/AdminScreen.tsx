import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, ShoppingCart } from 'lucide-react';

export default function AdminScreen() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <Card className="w-full max-w-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-black">Admin Dashboard</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center justify-center gap-4 p-6">
                        <Link href="/admin/users" className="w-full md:w-auto">
                            <Button className="w-full text-lg text-semibold p-6 bg-yellow-500 hover:bg-yellow-600 text-white">
                                <User className="mr-2" />
                                CRUD Users
                            </Button>
                        </Link>
                        <Link href="/admin/products" className="w-full md:w-auto">
                            <Button className="w-full text-lg p-6 bg-yellow-500 hover:bg-yellow-600 text-white">
                                <ShoppingCart className="mr-2" />
                                CRUD Products
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
