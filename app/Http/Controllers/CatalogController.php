<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::query();

        // 1. Terapkan filter pencarian umum (dari header)
        $query->when($request->input('search'), function ($q, $search) {
            $q->where('nameProduct', 'like', "%{$search}%")
              ->orWhere('brandProduct', 'like', "%{$search}%")
              ->orWhere('specs', 'like', "%{$search}%");
        });

        // 2. Terapkan filter spesifik dari sidebar
        $query->when($request->input('brandProduct'), fn ($q, $v) => $q->where('brandProduct', 'like', "%{$v}%"));
        $query->when($request->input('specs'), fn ($q, $v) => $q->where('specs', 'like', "%{$v}%"));
        $query->when($request->input('stockProduct'), fn ($q, $v) => strtolower($v) === 'tersedia' ? $q->where('stockProduct', '>', 0) : $q);
        $query->when($request->input('price'), function ($q, $price) {
            $range = explode('-', str_replace(' ', '', $price));
            if (isset($range[0]) && is_numeric($range[0])) $q->where('price', '>=', $range[0]);
            if (isset($range[1]) && is_numeric($range[1])) $q->where('price', '<=', $range[1]);
            return $q;
        });

        $products = $query->latest()->get();

        return Inertia::render('Catalog', [
            'products' => $products,
            // 3. Kirim semua filter kembali ke view agar input tetap terisi
            'filters' => $request->only(['search', 'price', 'specs', 'brandProduct', 'stockProduct']),
        ]);
    }

    public function show(Product $product): Response
    {
        $isFavorited = false;
        if (Auth::check()) {
            $isFavorited = Auth::user()->favorites()->where('favorites.idProduct', $product->idProduct)->exists();
        }

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'isFavorited' => $isFavorited,
        ]);
    }
}
