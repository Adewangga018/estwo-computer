<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\AccountController;

// Rute Publik
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/catalog/{product}', [CatalogController::class, 'show'])->name('catalog.show');

// Rute yang memerlukan autentikasi
Route::middleware('auth')->group(function () {
    Route::post('/favorites/toggle/{product}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::get('/account', [AccountController::class, 'show'])->name('account');
});

// Rute Admin (Hanya untuk Produk)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Route untuk dashboard utama admin
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Resource routes hanya untuk CRUD Products
    Route::resource('products', ProductController::class)->except(['create', 'edit', 'show']);
});

require __DIR__.'/auth.php';
