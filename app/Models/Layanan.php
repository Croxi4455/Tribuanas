<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model: Layanan
 * Tabel: layanan — jasa/layanan yang ditawarkan
 */
class Layanan extends Model
{
    protected $table = 'layanan';

    protected $fillable = [
        'nama',
        'slug',
        'deskripsi',
        'icon',
        'urutan',
    ];

    protected function casts(): array
    {
        return [
            'urutan' => 'integer',
        ];
    }

    /**
     * Scope: urutkan berdasarkan kolom urutan
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('urutan', 'asc');
    }
}
