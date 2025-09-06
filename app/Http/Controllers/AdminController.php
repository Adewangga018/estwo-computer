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
    public function users(): Response
    {
        // Mengirimkan data user dengan paginasi ke halaman UsersMonitoring
        return Inertia::render('admin/UsersMonitoring', [
            'users' => User::latest()->paginate(10)
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

    public function updateUser(Request $request, User $user)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName' => 'nullable|string|max:100',
            'email' => 'required|email|max:150|unique:users,email,' . $user->idUser . ',idUser',
            'password' => 'nullable|string|min:6',
        ]);

        // Jika password tidak diisi (kosong), hapus dari array agar tidak di-update.
        if (empty($validated['password'])) {
            unset($validated['password']);
        } else {
            // Jika ada password baru, hash password tersebut.
            $validated['password'] = Hash::make($validated['password']);
        }

        // Update user dengan data yang sudah divalidasi
        $user->update($validated);

        return redirect()->route('admin.users')->with('success', 'User updated successfully.');
    }

    /**
     * Hapus user dari halaman admin.
     */
    public function deleteUser(User $user)
    {
        $user->delete();
        return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
    }
}
