<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // Filter pencarian
        $query->when($request->input('search'), function ($q, $search) {
            $q->where('nameProduct', 'like', "%{$search}%");
        });

        // Filter rentang harga (BARU)
        $query->when($request->input('priceRange'), function ($q, $priceRange) {
            $range = explode('-', $priceRange);
            $minPrice = $range[0];

            if (isset($range[1])) {
                $maxPrice = $range[1];
                $q->whereBetween('price', [$minPrice, $maxPrice]);
            } else {
                // Untuk kasus harga 10.000.000++
                $q->where('price', '>=', $minPrice);
            }
        });

        // Filter tipe (BARU)
        $query->when($request->input('type'), function ($q, $type) {
            $q->where('typeProduct', $type);
        });

        // Filter merk (Checkbox)
        $query->when($request->input('brands'), function ($q, $brands) {
            if (is_array($brands) && count($brands) > 0) {
                $q->whereIn('brandProduct', $brands);
            }
        });

        // Filter spesifikasi (Checkbox)
        $query->when($request->input('specs'), function ($q, $specs) {
             if (is_array($specs) && count($specs) > 0) {
                $q->where(function ($subQuery) use ($specs) {
                    foreach ($specs as $spec) {
                        $subQuery->orWhere('specs', 'like', '%' . $spec . '%');
                    }
                });
            }
        });

        // Ambil data unik untuk filter sidebar
        $brands = Product::select('brandProduct')->whereNotNull('brandProduct')->distinct()->pluck('brandProduct');

        // Mengambil semua 'specs', membersihkannya, dan mengambil nilai unik
        $allSpecs = Product::pluck('specs')->flatMap(function ($spec) {
            // Asumsi specs adalah string dipisahkan koma, contoh: "Core i5, 8GB, SSD"
            return array_map('trim', explode(',', $spec));
        })->unique()->filter()->values();

        return Inertia::render('Catalog', [
            'products' => $query->latest()->paginate(12)->withQueryString(),
            'filters' => $request->all(),
            'brands' => $brands,
            'specs' => $allSpecs,
        ]);
    }

    public function show(Product $product)
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

