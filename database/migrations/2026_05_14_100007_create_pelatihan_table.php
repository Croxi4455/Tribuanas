<?php

/**
 * Migration: Tabel pelatihan
 * Menyimpan program pelatihan satpam/security
 * Jenis: kompetensi_dasar (Gada Pratama/Madya/Utama) dan kompetensi_khusus
 * Mendukung soft delete untuk arsip pelatihan lama
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pelatihan', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->enum('jenis', ['kompetensi_dasar', 'kompetensi_khusus']);
            $table->text('deskripsi');
            $table->string('gambar')->nullable();
            $table->string('durasi');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pelatihan');
    }
};
