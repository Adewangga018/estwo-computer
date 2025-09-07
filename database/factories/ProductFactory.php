<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Menentukan apakah produk ini diskon atau tidak
        $isDiscount = $this->faker->boolean(30); // 30% kemungkinan produk akan diskon

        return [
            'nameProduct' => $this->faker->words(3, true),
            'typeProduct' => $this->faker->randomElement(['Gaming', 'Non-Gaming']),
            'detailProduct' => $this->faker->paragraph(),
            'brandProduct' => $this->faker->randomElement(['Asus', 'Lenovo', 'HP', 'Dell', 'Acer']),
            'price' => $this->faker->numberBetween(5000000, 25000000),
            'isDiscount' => $isDiscount,
            'discountPercentage' => $isDiscount ? $this->faker->numberBetween(1, 99) : null,
            'grade' => $this->faker->randomElement(['A', 'B', 'C']),
            'completenessProduct' => $this->faker->randomElement(['Satu set', 'Batangan']),
            'specs' => $this->faker->sentence(),
            'disability' => $this->faker->sentence(),
            'linkProduct' => $this->faker->url(),
            'photo' => null,
        ];
    }
}
