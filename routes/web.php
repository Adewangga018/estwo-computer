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

// Rute Admin
Route::middleware(['auth', 'admin'])->group(function () {
    // TAMBAHKAN ->name(...) PADA BARIS-BARIS INI
    Route::get('/admin', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/products', [AdminController::class, 'products'])->name('admin.products');
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');

    // CRUD Products
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::post('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    // Rute untuk CRUD Users
    Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
    Route::put('/users/{user:idUser}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{user:idUser}', [AdminController::class, 'deleteUser'])->name('users.destroy');
});

require __DIR__.'/auth.php';
