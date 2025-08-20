
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AccountController;
// Logout route
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

// Auth routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

Route::get('/home', function () {
    return Inertia::render('Home');
});

// Account routes
Route::get('/account', [AccountController::class, 'show'])->name('account');
Route::post('/account/edit', [AccountController::class, 'edit'])->name('account.edit');
Route::post('/account/delete', [AccountController::class, 'delete'])->name('account.delete');


Route::get('/', function () {
    return Inertia::render('Login');
});

Route::get('/catalog', function () {
    // Contoh data produk, bisa diganti dengan data dari database
    $products = [];
    return Inertia::render('Catalog', [
        'products' => $products
    ]);
});
