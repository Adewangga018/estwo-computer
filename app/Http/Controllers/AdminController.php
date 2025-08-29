<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     * Halaman ini akan menjadi entry point untuk /sipak.
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
     * Halaman ini akan diakses melalui /sipak/products.
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
     * Halaman ini akan diakses melalui /sipak/users.
     */
    public function users(): Response
    {
        // Mengirimkan data user dengan paginasi ke halaman UsersMonitoring
        return Inertia::render('admin/UsersMonitoring', [
            'users' => User::latest()->paginate(10)
        ]);
    }

    /**
     * Menyimpan user baru dari form di halaman admin.
     */
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName' => 'nullable|string|max:100',
            'email' => 'required|email|max:150|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        User::create([
            'firstName' => $validated['firstName'],
            'lastName' => $validated['lastName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->route('sipak.users')->with('success', 'User created successfully.');
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

        $user->fill($validated);

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()->route('sipak.users')->with('success', 'User updated successfully.');
    }

    /**
     * Hapus user dari halaman admin.
     */
    public function deleteUser(User $user)
    {
        $user->delete();
        return redirect()->route('sipak.users')->with('success', 'User deleted successfully.');
    }
}
