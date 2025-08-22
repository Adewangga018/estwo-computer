<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'idUser';

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'isAdmin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * The products that the user has favorited.
     * Mendefinisikan semua nama kunci (key) secara eksplisit
     * karena kita tidak menggunakan nama default Laravel ('id').
     */
    public function favorites()
    {
        return $this->belongsToMany(
            Product::class,      // Model tujuan
            'favorites',         // Nama tabel pivot
            'idUser',            // Foreign key di tabel pivot untuk User
            'idProduct',         // Foreign key di tabel pivot untuk Product
            'idUser',            // Primary key di tabel User
            'idProduct'          // Primary key di tabel Product
        )->withTimestamps();
    }
}
