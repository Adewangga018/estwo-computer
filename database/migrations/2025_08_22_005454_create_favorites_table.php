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
            // Mendefinisikan kolom secara eksplisit
            $table->unsignedBigInteger('idUser');
            $table->unsignedBigInteger('idProduct');
            $table->timestamps();

            // Membuat constraint unique
            $table->unique(['idUser', 'idProduct']);

            // Menambahkan foreign key constraint
            $table->foreign('idUser')->references('idUser')->on('users')->onDelete('cascade');
            $table->foreign('idProduct')->references('idProduct')->on('products')->onDelete('cascade');
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
