<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     * Halaman ini akan menjadi entry point untuk /admin.
     */
    public function dashboard(): Response
    {
        // Mengirimkan data total produk dan user ke halaman AdminScreen
        return Inertia::render('AdminScreen', [
            'totalProducts' => Product::count(),
            'totalUsers' => User::count(),
        ]);
    }

    /**
     * Display the product management page.
     * Halaman ini akan diakses melalui /admin/products.
     */
    public function products(): Response
    {
        // Mengirimkan data produk dengan paginasi ke halaman ProductsMonitoring
        return Inertia::render('admin/ProductsMonitoring', [
            'products' => Product::latest()->paginate(10)
        ]);
    }

    /**
     * Display the user management page.
     * Halaman ini akan diakses melalui /admin/users.
     */
    public function index() // <-- Sebelumnya bernama users()
    {
    // Cek apakah ini halaman dashboard utama atau daftar user
    if (request()->routeIs('admin.dashboard')) {
        return Inertia::render('AdminScreen');
    }

    // Jika bukan, ini adalah halaman daftar user
    return Inertia::render('admin/UsersMonitoring', [
        'users' => User::all()
        ]);
    }

    /**
     * Store a newly created user in storage.
     */
    public function storeUser(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('admin.users')->with('message', 'User created successfully.');
    }

    /**
     * Update data user dari form di halaman admin.
     */

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $user)
    {
        // Tambahkan logika untuk update data user di sini
        // Contoh: $user->update($request->all());

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $user)
    {
        // Tambahkan logika untuk menghapus user di sini
        // Contoh: $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
