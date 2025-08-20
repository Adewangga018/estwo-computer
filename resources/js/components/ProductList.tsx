// resources/js/components/ProductList.tsx

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Definisikan tipe data untuk produk
interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div>
            <h2 className="mb-6 text-3xl font-bold">Daftar Barang</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden rounded-lg shadow-lg">
                        <CardHeader className="p-0">
                            <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="mb-2 text-lg font-bold">{product.name}</CardTitle>
                            <p className="text-gray-700">{product.price}</p>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Button className="w-full bg-black text-white hover:bg-gray-800">
                                Beli
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
