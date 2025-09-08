<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class HomeController extends Controller
{
    public function index()
    {
        // Mengambil 2 produk dengan Grade 'A' secara acak sebagai produk populer
        $popularProducts = Product::where('grade', 'A')
                                  ->inRandomOrder()
                                  ->limit(2)
                                  ->get();

        // Mengambil 2 produk terbaru berdasarkan tanggal pembuatan
        $newestProducts = Product::latest()
                                 ->limit(2)
                                 ->get();

        // Mengambil semua produk untuk bagian Flash Sale
        $products = Product::latest()->get();

        return Inertia::render('Home', [
            'popularProducts' => $popularProducts,
            'newestProducts' => $newestProducts,
            'products' => $products, // <-- TAMBAHKAN PROPS INI
        ]);
    }
}
