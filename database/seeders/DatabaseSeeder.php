<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // // Membuat satu user spesifik untuk testing
        // User::factory()->create([
        //     'firstName' => 'Admin',
        //     'lastName' => 'User',
        //     'email' => 'admin@example.com',
        //     'isAdmin' => true, // Jadikan user ini sebagai admin
        // ]);

        // // Membuat satu user biasa
        // User::factory()->create([
        //     'firstName' => 'Test',
        //     'lastName' => 'User',
        //     'email' => 'test@example.com',
        // ]);

        // // Memanggil seeder untuk produk
        // $this->call([
        //     ProductSeeder::class,
        // ]);
    }
}
