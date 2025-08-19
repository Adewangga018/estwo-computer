<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home'); // Ganti 'welcome' menjadi 'home'
})->name('home');

// Hapus atau beri komentar pada rute dashboard jika tidak diperlukan
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

require __DIR__.'/auth.php';
// Hapus atau beri komentar pada rute settings jika tidak diperlukan
// require __DIR__.'/settings.php';
