<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Menampilkan halaman utama admin (menu pilihan).
     */
    public function dashboard()
    {
        return Inertia::render('AdminScreen');
    }
}
