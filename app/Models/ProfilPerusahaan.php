<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model: ProfilPerusahaan
 * Tabel: profil_perusahaan — data profil perusahaan (singleton)
 */
class ProfilPerusahaan extends Model
{
    protected $table = 'profil_perusahaan';

    protected $fillable = [
        'nama_perusahaan',
        'tagline',
        'deskripsi',
        'alamat',
        'telepon',
        'email',
        'maps_embed',
        'logo',
        'tahun_berdiri',
        'facebook',
        'instagram',
        'twitter',
    ];

    protected function casts(): array
    {
        return [
            'tahun_berdiri' => 'integer',
        ];
    }

    /**
     * Ambil profil perusahaan (singleton - hanya 1 baris)
     */
    public static function getProfil(): ?self
    {
        return static::first();
    }
}
