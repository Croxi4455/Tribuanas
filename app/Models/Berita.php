<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Berita extends Model
{
    protected $table = 'berita';
    protected $fillable = ['judul', 'slug', 'isi', 'tanggal_publish', 'is_published', 'gambar'];

// Tambahkan Accessor agar URL gambar otomatis mengarah ke folder storage
public function getGambarUrlAttribute()
{
    return $this->gambar ? asset('storage/' . $this->gambar) : null;
}

    // Scope untuk LandingController baris 78
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(fn ($model) => $model->slug = Str::slug($model->judul));
        static::updating(fn ($model) => $model->slug = Str::slug($model->judul));
    }
}