<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model: Galeri
 * Tabel: galeri — foto kegiatan, pelatihan, fasilitas, event
 */
class Galeri extends Model
{
    protected $table = 'galeri';

    protected $fillable = [
        'judul',
        'gambar',
        'kategori',
    ];

    /**
     * Scope: filter berdasarkan kategori
     */
    public function scopeKategori($query, string $kategori)
    {
        return $query->where('kategori', $kategori);
    }
}
