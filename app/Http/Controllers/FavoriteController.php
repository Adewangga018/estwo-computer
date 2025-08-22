<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    /**
     * Menampilkan halaman produk favorit user.
     */
    public function index()
    {
        $user = Auth::user();
        $favoriteProducts = $user->favorites()->latest()->get();

        return Inertia::render('Favorites', [
            'products' => $favoriteProducts
        ]);
    }

    /**
     * Menambah atau menghapus produk dari daftar favorit.
     */
    public function toggle(Product $product)
    {
        $user = Auth::user();

        // toggle() akan menambah jika belum ada, dan menghapus jika sudah ada
        $user->favorites()->toggle($product->idProduct);

        return back();
    }
}
