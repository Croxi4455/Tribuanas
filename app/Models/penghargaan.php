<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penghargaan extends Model
{
    use HasFactory;

    protected $table = 'penghargaan';

    protected $fillable = [
        'nama_penghargaan',
        'instansi', // Siapa yang memberikan penghargaan
        'tahun',
        'deskripsi'
    ];
}