<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Update user dari admin.
     */
    public function updateUser(Request $request, $idUser)
    {
        $user = User::where('idUser', $idUser)->firstOrFail();
        $validated = $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName' => 'required|string|max:100',
            'email' => 'required|email|max:150|unique:users,email,' . $user->idUser . ',idUser',
            'password' => 'nullable|string|min:6',
        ]);

        $user->firstName = $validated['firstName'];
        $user->lastName = $validated['lastName'];
        $user->email = $validated['email'];
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->save();

        return response()->json(['success' => true, 'user' => $user]);
    }

    /**
     * Delete user dari admin.
     */
    public function deleteUser($idUser)
    {
        $user = User::where('idUser', $idUser)->firstOrFail();
        $user->delete();
        return response()->json(['success' => true]);
    }
    /**
     * Menangani percobaan login admin.
     */
    public function processLogin(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

    $adminPassword = config('app.admin_password');

        // Debug log untuk analisa password
        Log::info('Admin login', [
            'input' => $request->password,
            'config' => $adminPassword,
            'match' => $request->password === $adminPassword
        ]);

        // Periksa apakah password yang dimasukkan sama dengan yang ada di .env
        if ($request->password === $adminPassword) {
            // Jika berhasil, set session admin
            $request->session()->put('is_admin', true);
            $request->session()->regenerate();

            return Redirect::route('admin.dashboard');
        }

        // Jika gagal, kembalikan ke halaman sebelumnya dengan pesan error
        return back()->withErrors(['password' => 'Password admin tidak valid.']);
    }

    /**
     * Menampilkan dashboard admin.
     */
    public function dashboard()
    {
        return Inertia::render('AdminScreen');
    }

    /**
     * Menampilkan halaman monitoring user.
     */
    public function users()
{
    // Ambil data user dari database dengan pagination, 10 user per halaman
    // Kita juga hanya memilih kolom yang kita perlukan
    $users = User::latest()->paginate(10)->through(fn ($user) => [
        'idUser' => $user->idUser,
        'firstName' => $user->firstName,
        'lastName' => $user->lastName,
        'email' => $user->email,
    ]);

    return Inertia::render('admin/UsersMonitoring', [
        'users' => $users
    ]);
}

    /**
     * Menampilkan halaman monitoring produk.
     */
    public function products()
    {
        // Anda perlu membuat Model 'Product' terlebih dahulu
        // $products = \App\Models\Product::paginate(10);

        return Inertia::render('admin/ProductsMonitoring', [
            'products' => [] // Kirim array kosong untuk sementara
        ]);
    }

    /**
     * Proses logout admin
     */
    public function logout(Request $request)
    {
        $request->session()->forget('is_admin');
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Redirect::route('admin.login');
    }

    /**
     * Menyimpan user baru dari admin.
     */
    public function storeUser(Request $request)
    {
        $validated = $request->validate([
            'firstName' => 'required|string|max:100',
            'lastName' => 'required|string|max:100',
            'email' => 'required|email|max:150|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'firstName' => $validated['firstName'],
            'lastName' => $validated['lastName'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['success' => true, 'user' => $user], 201);
    }
}
