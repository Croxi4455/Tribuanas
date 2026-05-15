<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model: Mitra
 * Tabel: mitra — perusahaan/instansi mitra
 */
class Mitra extends Model
{
    protected $table = 'mitra';

    protected $fillable = [
        'nama',
        'logo',
        'kota',
        'tahun',
    ];

    protected function casts(): array
    {
        return [
            'tahun' => 'integer',
        ];
    }
}
