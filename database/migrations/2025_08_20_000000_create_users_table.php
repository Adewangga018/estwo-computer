<?php
// database/migrations/2025_08_20_000000_create_users_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('idUser');
            $table->string('firstName', 100);
            $table->string('lastName', 100)->nullable();
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->boolean('isAdmin')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
