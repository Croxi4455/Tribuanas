<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model: Berita
 * Tabel: berita — artikel berita/kegiatan perusahaan
 */
class Berita extends Model
{
    use SoftDeletes;

    protected $table = 'berita';

    protected $fillable = [
        'judul',
        'slug',
        'isi',
        'gambar',
        'tanggal_publish',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_publish' => 'date',
            'is_published' => 'boolean',
        ];
    }

    /**
     * Scope: hanya berita yang sudah dipublish
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
