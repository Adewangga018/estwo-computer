// resources/js/components/FilterSidebar.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function FilterSidebar() {
    return (
        <Card className="rounded-lg shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="harga">Harga</Label>
                    <Input id="harga" placeholder="Contoh: 5000000 - 10000000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="spesifikasi">Spesifikasi</Label>
                    <Input id="spesifikasi" placeholder="Contoh: i5, 8GB RAM" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="merk">Merk</Label>
                    <Input id="merk" placeholder="Contoh: ASUS, Lenovo" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="stok">Stok</Label>
                    <Input id="stok" placeholder="Contoh: Tersedia" />
                </div>
                <div className="flex space-x-2 pt-4">
                    <Button variant="secondary" className="w-full">
                        Reset
                    </Button>
                    <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600">
                        Terapkan
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
