<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $csrf = csrf_token();
        return Inertia::render('Account', [
            'user' => $user,
            'csrf' => $csrf
        ]);
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
        $data = $request->validate([
            'firstName' => ['required', 'string', 'max:100'],
            'lastName' => ['nullable', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:150', 'unique:users,email,' . $user->idUser . ',idUser'],
            'password' => ['nullable', 'string', 'min:6'],
        ]);

        $user->firstName = $data['firstName'];
        $user->lastName = $data['lastName'] ?? null;
        $user->email = $data['email'];
        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }
        $user->save();

        return redirect()->route('account')->with('success', 'Akun berhasil diperbarui.');
    }

    public function delete(Request $request)
    {
        $user = Auth::user();
        Auth::logout();
        $user->delete();
        return redirect('/')->with('success', 'Akun berhasil dihapus.');
    }
}
