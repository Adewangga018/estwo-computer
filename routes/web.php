
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\AdminController;


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

// Rute untuk memproses login admin
Route::post('/admin/login', [AdminController::class, 'processLogin'])->name('admin.login.process');

// Grup rute untuk semua halaman admin yang dilindungi
Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/products', [AdminController::class, 'products'])->name('products');
    Route::post('/logout', [AdminController::class, 'logout'])->name('logout');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
    Route::put('/users/{idUser}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{idUser}', [AdminController::class, 'deleteUser'])->name('users.delete');
});

Route::get('/catalog', function () {
    // Contoh data produk, bisa diganti dengan data dari database
    $products = [];
    return Inertia::render('Catalog', [
        'products' => $products
    ]);
});
