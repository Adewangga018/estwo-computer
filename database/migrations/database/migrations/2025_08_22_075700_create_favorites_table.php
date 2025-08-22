<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idUser')->constrained('users', 'idUser')->onDelete('cascade');
            $table->foreignId('idProduct')->constrained('products', 'idProduct')->onDelete('cascade');
            $table->timestamps();

            // Mencegah duplikat (satu user hanya bisa memfavoritkan satu produk sekali)
            $table->unique(['idUser', 'idProduct']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
