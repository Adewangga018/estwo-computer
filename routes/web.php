<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;

// --- PERUBAHAN DI SINI ---
// Jadikan Halaman Home sebagai entrypoint utama
Route::get('/', [HomeController::class, 'index'])->name('home');

// Logout route
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

// Auth routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login')->middleware('guest');
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::get('/register', [AuthController::class, 'showRegister'])->name('register')->middleware('guest');
Route::post('/register', [AuthController::class, 'register'])->middleware('guest');

// Hapus rute /home yang lama karena sudah digantikan oleh /
Route::get('/home', [HomeController::class, 'index'])->name('home');

// Account & Favorites routes (memerlukan login)
Route::middleware('auth')->group(function () {
    Route::get('/account', [AccountController::class, 'show'])->name('account');
    Route::post('/account/edit', [AccountController::class, 'edit'])->name('account.edit');
    Route::post('/account/delete', [AccountController::class, 'delete'])->name('account.delete');
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites/{product}', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
});

// Catalog routes
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/catalog/{product}', [CatalogController::class, 'show'])->name('catalog.show');

Route::prefix('sipak')->middleware(['auth', 'admin'])->name('sipak.')->group(function () {
    // Arahkan /sipak ke metode dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    // Rute untuk halaman-halaman spesifik di dalam admin
    Route::get('/products', [AdminController::class, 'products'])->name('products');
    Route::get('/users', [AdminController::class, 'users'])->name('users');

    // Rute untuk aksi CRUD Products (tidak berubah)
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::post('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

require __DIR__.'/auth.php';
