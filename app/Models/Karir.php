<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model: Karir
 * Tabel: karir — lowongan kerja
 */
class Karir extends Model
{
    use SoftDeletes;

    protected $table = 'karir';

    protected $fillable = [
        'posisi',
        'deskripsi',
        'syarat',
        'lokasi',
        'status',
        'batas_daftar',
    ];

    protected function casts(): array
    {
        return [
            'batas_daftar' => 'date',
        ];
    }

    /**
     * Scope: hanya lowongan yang masih buka
     */
    public function scopeBuka($query)
    {
        return $query->where('status', 'buka');
    }

    /**
     * Cek apakah lowongan masih dalam batas pendaftaran
     */
    public function masihBerlaku(): bool
    {
        return $this->batas_daftar->isFuture() && $this->status === 'buka';
    }
}
