<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/home');
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    public function showRegister()
    {
        return Inertia::render('Register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'firstName' => ['required', 'string', 'max:100'],
            'lastName' => ['nullable', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
        ]);

        $user = User::create([
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'] ?? null,
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

    // Setelah register, arahkan ke halaman login
    return redirect('/login')->with('success', 'Registrasi berhasil! Silakan login.');
    }
}
