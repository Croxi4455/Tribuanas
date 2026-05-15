<?php

/**
 * Migration: Tabel galeri
 * Menyimpan foto-foto kegiatan, pelatihan, fasilitas, dan event perusahaan
 * Kategori menggunakan enum untuk filter di frontend
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('galeri', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('gambar');
            $table->enum('kategori', ['kegiatan', 'pelatihan', 'fasilitas', 'event']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('galeri');
    }
};
