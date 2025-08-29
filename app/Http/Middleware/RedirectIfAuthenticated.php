<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                // --- PERUBAHAN DIMULAI DI SINI ---

                // Cek apakah user yang sedang login adalah admin
                if (Auth::user()->is_admin) {
                    // Jika iya, arahkan ke dashboard admin
                    return redirect(route('sipak.dashboard'));
                }

                // Jika bukan admin, arahkan ke halaman home biasa
                return redirect(RouteServiceProvider::HOME);

                // --- PERUBAHAN SELESAI ---
            }
        }

        return $next($request);
    }
}
