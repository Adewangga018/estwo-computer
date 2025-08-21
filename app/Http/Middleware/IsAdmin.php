<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Periksa apakah session 'is_admin' ada dan bernilai true
        if (!$request->session()->get('is_admin')) {
            // Jika tidak, redirect ke halaman login
            return redirect()->route('login');
        }

        return $next($request);
    }
}
