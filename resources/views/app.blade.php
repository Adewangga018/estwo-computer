<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Primary Meta Tags -->
        <meta name="title" content="{{ config('app.name', 'Estwo Computer') }}">
        <meta name="description" content="Toko komputer terpercaya menyediakan laptop, PC, dan aksesoris komputer berkualitas dengan harga terjangkau.">

        <!-- Open Graph / Facebook / WhatsApp -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ config('app.url') }}">
        <meta property="og:title" content="{{ config('app.name', 'Estwo Computer') }}">
        <meta property="og:description" content="Toko komputer terpercaya menyediakan laptop, PC, dan aksesoris komputer berkualitas dengan harga terjangkau.">
        <meta property="og:image" content="{{ asset('favicon.svg') }}">
        <meta property="og:site_name" content="{{ config('app.name', 'Estwo Computer') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ config('app.url') }}">
        <meta property="twitter:title" content="{{ config('app.name', 'Estwo Computer') }}">
        <meta property="twitter:description" content="Toko komputer terpercaya menyediakan laptop, PC, dan aksesoris komputer berkualitas dengan harga terjangkau.">
        <meta property="twitter:image" content="{{ asset('favicon.svg') }}">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        {{-- <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script> --}}

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Estwo Computer') }}</title>

        {{-- <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"> --}}

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon-32x32.png') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon-16x16.png') }}">
        <link rel="manifest" href="{{ asset('site.webmanifest') }}">
        <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
        <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">

        @routes {{-- Pastikan baris ini ada SEBELUM @vite --}}
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/css/app.css"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
