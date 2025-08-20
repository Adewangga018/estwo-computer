<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class CatalogController extends Controller
{
    /**
     * Display the catalog page.
     */
    public function index(): Response
    {
        // Nantinya Anda bisa mengambil data produk dari database di sini
        // dan mengirimkannya sebagai props.
        // Contoh: 'products' => Product::all()
        return Inertia::render('Catalog', [
            'products' => [
                // Data dummy untuk contoh
                ['id' => 1, 'name' => 'Laptop Gaming Legion', 'price' => 'Rp 15.000.000', 'image' => '/images/placeholder.png'],
                ['id' => 2, 'name' => 'Macbook Pro M3', 'price' => 'Rp 25.000.000', 'image' => '/images/placeholder.png'],
                ['id' => 3, 'name' => 'ASUS Vivobook', 'price' => 'Rp 8.500.000', 'image' => '/images/placeholder.png'],
                ['id' => 4, 'name' => 'HP Pavilion Aero', 'price' => 'Rp 12.000.000', 'image' => '/images/placeholder.png'],
            ]
        ]);
    }
}
