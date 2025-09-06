<?php

namespace App\Models;

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
        'grade',
        'completenessProduct',
        'specs',
        'disability',
        'linkProduct',
        'photo',
    ];
}
