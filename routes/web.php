<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\DashboardMonitoringController;
use Inertia\Inertia;

// Rute Publik
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/catalog/{product}', [CatalogController::class, 'show'])->name('catalog.show');
Route::get('/testimonials', [TestimonialController::class, 'publicIndex'])->name('testimonials.public.index');
Route::get('/review', [ReviewController::class, 'index'])->name('review.index');


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

    // Route GET untuk Dashboard Monitoring
    Route::get('/dashboardmonitoring', [DashboardMonitoringController::class, 'dashboardmonitoring'])->name('dashboardmonitoring');

    // Resource routes hanya untuk CRUD Products
    Route::resource('products', ProductController::class)->except(['create', 'edit', 'show']);

        Route::get('testimonials', [TestimonialController::class, 'index'])->name('testimonials.index');
        Route::post('testimonials', [TestimonialController::class, 'store'])->name('testimonials.store');
        Route::put('testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update'); // Menggunakan POST untuk update agar bisa handle file upload
        Route::delete('testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('testimonials.destroy');
});

Route::get('/faq', function () {
    return Inertia::render('faq');
})->name('faq');

require __DIR__.'/auth.php';
