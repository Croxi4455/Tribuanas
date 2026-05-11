<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lowongan extends Model
{
    use HasFactory;

    protected $table = 'lowongan'; // Menegaskan nama tabel

    protected $fillable = [
        'posisi', 
        'slug', 
        'lokasi', 
        'kualifikasi', 
        'deskripsi', 
        'tipe', 
        'is_active'
    ];
}