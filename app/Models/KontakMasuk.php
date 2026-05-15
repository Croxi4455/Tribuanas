<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Model: KontakMasuk
 * Tabel: kontak_masuk — pesan masuk dari form kontak
 */
class KontakMasuk extends Model
{
    protected $table = 'kontak_masuk';

    protected $fillable = [
        'nama',
        'email',
        'telepon',
        'subjek',
        'pesan',
        'is_read',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }

    /**
     * Scope: pesan yang belum dibaca
     */
    public function scopeBelumDibaca($query)
    {
        return $query->where('is_read', false);
    }

    /**
     * Tandai pesan sebagai sudah dibaca
     */
    public function tandaiDibaca(): void
    {
        $this->update(['is_read' => true]);
    }
}
