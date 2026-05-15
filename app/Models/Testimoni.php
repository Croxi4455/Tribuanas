<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model: Testimoni
 * Tabel: testimoni — testimoni dari klien
 */
class Testimoni extends Model
{
    protected $table = 'testimoni';

    protected $fillable = [
        'nama',
        'jabatan',
        'perusahaan',
        'foto',
        'isi',
        'rating',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Scope: hanya testimoni yang aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
