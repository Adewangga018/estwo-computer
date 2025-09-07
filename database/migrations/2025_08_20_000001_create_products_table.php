<?php
// database/migrations/2025_08_20_000001_create_products_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('idProduct');
            $table->string('nameProduct', 150);
            $table->enum('typeProduct', ['Gaming', 'Non-Gaming'])->nullable();
            $table->text('detailProduct')->nullable();
            $table->string('brandProduct', 100)->nullable();
            $table->decimal('price', 15, 2)->default(0);
            $table->boolean('isDiscount')->default(false);
            $table->integer('discountPercentage')->nullable();
            $table->string('grade', 50)->nullable();
            $table->string('completenessProduct', 255)->nullable();
            $table->text('specs')->nullable();
            $table->text('disability')->nullable();
            $table->string('linkProduct')->nullable();
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
