<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model: Pelatihan
 * Tabel: pelatihan — program pelatihan security
 */
class Pelatihan extends Model
{
    use SoftDeletes;

    protected $table = 'pelatihan';

    protected $fillable = [
        'judul',
        'jenis',
        'deskripsi',
        'gambar',
        'durasi',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    /**
     * Scope: hanya pelatihan aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: filter berdasarkan jenis pelatihan
     */
    public function scopeJenis($query, string $jenis)
    {
        return $query->where('jenis', $jenis);
    }
}
