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
        $newestProducts = Product::latest() // latest() otomatis mengurutkan berdasarkan created_at (DESC)
                                 ->limit(2)
                                 ->get();

        return Inertia::render('Home', [
            'popularProducts' => $popularProducts,
            'newestProducts' => $newestProducts,
        ]);
    }
}
