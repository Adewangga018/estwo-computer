<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $primaryKey = 'idProduct';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nameProduct',
        'typeProduct',
        'detailProduct',
        'brandProduct',
        'price',
        'isDiscount',
        'discountPercentage',
        'grade',
        'completenessProduct',
        'specs',
        'disability',
        'linkProduct',
        'photo',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    // Pastikan menggunakan snake_case sesuai nama accessor
    protected $appends = ['priceDiscount'];

    /**
     * The attributes that should be cast to native types.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'isDiscount' => 'boolean',
            'specs' => 'array',
            'disability' => 'array',
        ];
    }

    /**
     * Accessor untuk menghitung harga diskon (priceDiscount).
     * Nama fungsi ini akan dikonversi menjadi 'priceDiscount' di JSON.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function getPriceDiscountAttribute(): ?float
    {
        if ($this->isDiscount && $this->discountPercentage > 0) {
            return $this->price - ($this->price * $this->discountPercentage / 100);
        }
        return null; // Kembalikan null jika tidak ada diskon
    }
}
