<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        // Mulai query builder
        $query = Product::query();

        // Terapkan filter berdasarkan input dari request
        $query->when($request->input('merk'), function ($q, $merk) {
            return $q->where('brandProduct', 'like', "%{$merk}%");
        });

        $query->when($request->input('spesifikasi'), function ($q, $spesifikasi) {
            return $q->where('specs', 'like', "%{$spesifikasi}%");
        });

        $query->when($request->input('stok'), function ($q, $stok) {
            if (strtolower($stok) === 'tersedia') {
                return $q->where('stockProduct', '>', 0);
            }
        });

        $query->when($request->input('harga'), function ($q, $harga) {
            $hargaRange = explode('-', str_replace(' ', '', $harga));
            if (isset($hargaRange[0]) && is_numeric($hargaRange[0])) {
                $q->where('price', '>=', $hargaRange[0]);
            }
            if (isset($hargaRange[1]) && is_numeric($hargaRange[1])) {
                $q->where('price', '<=', $hargaRange[1]);
            }
            return $q;
        });

        // Ambil hasil query dan kirim ke view
        $products = $query->latest()->get();

        return Inertia::render('Catalog', [
            'products' => $products,
            'filters' => $request->only(['harga', 'spesifikasi', 'merk', 'stok']), // Kirim filter kembali ke view
        ]);
    }

    public function show(Product $product): Response
    {
        return Inertia::render('ProductDetail', [
            'product' => $product,
        ]);
    }
}
