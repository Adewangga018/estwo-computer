import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from './ui/input';

// Tentukan tipe props yang akan diterima komponen ini
interface FilterSidebarProps {
    data: {
        price: string;
        type: string;
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
        <Card className="rounded-lg shadow-lg py-2">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Filter</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Form akan memanggil fungsi submit saat dikirim */}
                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="price">Harga</Label>
                        <Select value={data.price} onValueChange={(value) => setData('price', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih rentang harga" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0-1000000">0 - 1.000.000</SelectItem>
                                <SelectItem value="1000000-3000000">1.000.000 - 3.000.000</SelectItem>
                                <SelectItem value="3000000-5000000">3.000.000 - 5.000.000</SelectItem>
                                <SelectItem value="5000000-10000000">5.000.000 - 10.000.000</SelectItem>
                                <SelectItem value="10000000">10.000.000++</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Tipe</Label>
                        <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih tipe laptop" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Gaming">Gaming</SelectItem>
                                <SelectItem value="Non-Gaming">Non-Gaming</SelectItem>
                            </SelectContent>
                        </Select>
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
