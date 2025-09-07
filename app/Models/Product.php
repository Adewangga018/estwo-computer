<?php
// app/Models/Product.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

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
        'isDiscount', // <-- INI PENTING
        'discountPercentage', // <-- INI PENTING
        'grade',
        'completenessProduct',
        'specs',
        'disability',
        'linkProduct',
        'photo',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        // FUNGSI INI PENTING UNTUK MENGUBAH TIPE DATA
        return [
            'price' => 'float',
            'isDiscount' => 'boolean',
            'discountPercentage' => 'integer',
        ];
    }

    /**
     * Accessor untuk menghitung harga diskon secara otomatis.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    public function priceDiscount(): Attribute
    {
        // FUNGSI INI PENTING UNTUK MENGHITUNG HARGA DISKON
        return new Attribute(
            get: fn () => $this->isDiscount && $this->discountPercentage > 0
                ? $this->price - ($this->price * $this->discountPercentage / 100)
                : $this->price,
        );
    }
}
