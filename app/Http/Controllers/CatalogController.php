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

        $query->when($request->input('search'), function ($q, $search) {
            $q->where('nameProduct', 'like', "%{$search}%")
              ->orWhere('brandProduct', 'like', "%{$search}%")
              ->orWhere('specs', 'like', "%{$search}%");
        });

        $query->when($request->input('price'), function ($q, $priceRange) {
            if ($priceRange === '10000000') {
                // Untuk kasus harga 10.000.000++
                $q->where('price', '>=', 10000000);
            } else {
                $range = explode('-', $priceRange);
                if (count($range) === 2) {
                    $minPrice = $range[0];
                    $maxPrice = $range[1];
                    $q->whereBetween('price', [$minPrice, $maxPrice]);
                }
            }
        });

        $query->when($request->input('type'), function ($q, $type) {
            $q->where('typeProduct', $type);
        });

        $query->when($request->input('brandProduct'), fn ($q, $v) => $q->where('brandProduct', 'like', "%{$v}%"));
        $query->when($request->input('specs'), fn ($q, $v) => $q->where('specs', 'like', "%{$v}%"));
        // $query->when($request->input('price'), function ($q, $price) {
        //     $range = explode('-', str_replace(' ', '', $price));
        //     if (isset($range[0]) && is_numeric($range[0])) $q->where('price', '>=', $range[0]);
        //     if (isset($range[1]) && is_numeric($range[1])) $q->where('price', '<=', $range[1]);
        //     return $q;
        // });

        $products = $query->latest()->get();

        return Inertia::render('Catalog', [
            'products' => $products,
            'filters' => $request->only(['search', 'price', 'specs', 'brandProduct']),
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
