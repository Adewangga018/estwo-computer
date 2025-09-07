import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

// Tentukan tipe props yang akan diterima komponen ini
interface FilterSidebarProps {
    data: {
        price: string;
        specs: string;
        brandProduct: string;
    };
    setData: (key: string, value: string) => void;
    submit: (e: React.FormEvent) => void;
    reset: () => void;
    processing: boolean;
}

export default function FilterSidebar({ data, setData, submit, reset, processing }: FilterSidebarProps) {
    return (
        <Card className="rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Filter</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Form akan memanggil fungsi submit saat dikirim */}
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="price">Harga</Label>
                        <Input
                            id="price"
                            placeholder="Contoh: 5000000-10000000"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="specs">Spesifikasi</Label>
                        <Input
                            id="specs"
                            placeholder="Contoh: i5, 8GB RAM"
                            value={data.specs}
                            onChange={(e) => setData('specs', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="brandProduct">Merk</Label>
                        <Input
                            id="brandProduct"
                            placeholder="Contoh: ASUS, Lenovo"
                            value={data.brandProduct}
                            onChange={(e) => setData('brandProduct', e.target.value)}
                        />
                    </div>
                    <div className="flex space-x-2 pt-4">
                        <Button type="button" variant="secondary" className="w-full" onClick={reset} disabled={processing}>
                            Reset
                        </Button>
                        <Button type="submit" className="w-full bg-yellow-500 text-white hover:bg-yellow-600" disabled={processing}>
                            {processing ? 'Mencari...' : 'Terapkan'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
